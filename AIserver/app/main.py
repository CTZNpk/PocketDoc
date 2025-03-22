from fastapi import FastAPI, HTTPException, Form, Query
import markdown
from langchain_community.document_loaders import PyPDFLoader
from weasyprint import HTML
from fastapi.middleware.cors import CORSMiddleware
import fitz
import os
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
from langchain_text_splitters import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer
import numpy as np
from langchain.retrievers.multi_query import MultiQueryRetriever
from langchain_chroma import Chroma
from langchain_google_genai import ChatGoogleGenerativeAI
import chromadb
import re
import json


def get_application():
    _app = FastAPI()

    _app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "*"
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return _app


app = get_application()
llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash")


@app.get("/")
def default():
    return "The Api is working"


class SummarizeRequest(BaseModel):
    passage: str


local_model = "gemini"

load_dotenv()
api_key = os.getenv("GEMINI_API")

genai.configure(api_key=api_key)

# Initialize model
model = genai.GenerativeModel('gemini-2.0-flash')


@app.post("/summarize/")
async def summarize(request: SummarizeRequest):
    try:
        prompt = f"""Summarize the text below and return response parsable as markdown:
            1. Include specific details from the text.
            2. Ensure clarity and avoid vague statements.
            3. Keep concise with 30%-40% of original length
            4. Please make the summary relevant only to the passage provided please do not add any additional information

        Text: {request.passage}"""

        # Get Gemini response
        response = model.generate_content(prompt)

        return {
            "summary": response.text,
            "model_used": "gemini-pro"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini error: {str(e)}")


def extract_text_from_pdf(file_path: str, start_page: int, end_page: int) -> str:
    """Extracts text from a PDF file within a page range."""
    print("HERE WE ARE BRO")
    file_path = '../server/'+file_path
    loader = PyPDFLoader(file_path)
    pages = loader.load()[start_page - 1:end_page]
    print(pages)
    return "\n\n".join([page.page_content for page in pages])


def chunk_document(text: str, chunk_size: int = 7500) -> list:
    """Splits text into manageable chunks."""
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size, chunk_overlap=100)
    return splitter.split_text(text)


def get_summary_gemini(chunks: list) -> str:
    """Summarizes text using Gemini Pro with Markdown formatting."""
    context = ""
    summaries = []
    print(len(chunks))
    i = 0
    for chunk in chunks:
        if context != "":
            prompt = f"""
            Here is the summary of the document so far:
            {context}

            Please continue the summary with the new section below:
            {chunk}

            ### Important Instructions:
            - **Do NOT repeat previous content.** Continue seamlessly from where the last summary ended.
            - Extract **only the most essential information** (about 50% of key points) from this section.        - Preserve the original structure using **Markdown formatting**:
            - Use `##` for main headings and `###` for subheadings.
            - Highlight key terms and important points in **bold**.
            - **Start immediately**—no introduction, no context recap, just continue the summary.
            - This is a technical coding document Please keep the coding details
            - Assume the reader has already read the previous summaries.

            Please continue forward from the summary donot repeat **THIS IS ESSENTIAL MUST FOLLOW***
            Your output will be appended directly to the previous summary.
            """
        else:
            prompt = f"""
            Please summarize this section below:
            {chunk}

            ### Important Instructions:
            - Extract **only the most essential information** (about 50% of key points) from this section.        - Preserve the original structure using **Markdown formatting**:
            - Use `##` for main headings and `###` for subheadings.
            - Highlight key terms and important points in **bold**.
            - **Start immediately**—no introduction, no context recap, just continue the summary.

            this output will be directly show the user as summary
            """
        response = model.generate_content(prompt)
        summary = response.text
        summaries.append(summary)
        context = summary  # Carry forward previous summary
        print(i)
        i += 1
        print(context)

    return "".join(summaries)


@app.post("/summarize-doc/")
async def summarize_document(file_path: str = Form(...), start_page: int = Form(...), end_page: int = Form(...)):
    text = extract_text_from_pdf(file_path, start_page, end_page)
    chunks = chunk_document(text)
    final_summary = get_summary_gemini(chunks)
    html = markdown.markdown(final_summary)
    styled_html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body {{
                font-family: "Times New Roman", Times, serif;
                }}
                strong {{font-weight: bold; }}
                em {{font-style: italic; }}
            </style>
        </head>
        <body>
            {html}
        </body>
        </html>
        """

    HTML(string=styled_html).write_pdf(
        f"./summaries/test_${start_page}_${end_page}_summary.pdf")
    return {"summary": final_summary}

transformer_model = SentenceTransformer(
    "nomic-ai/nomic-embed-text-v1", trust_remote_code=True)

metadata_store = {}


def chunk_text(text, page_num, chunk_size=300):
    words = text.split()
    chunks = []
    for i in range(0, len(words), chunk_size):
        chunk = "search_document: " + " ".join(words[i:i + chunk_size])
        chunks.append((chunk, page_num))
    return chunks


CHROMA_DIR = "chroma_dbs"
os.makedirs(CHROMA_DIR, exist_ok=True)
chroma_client = chromadb.PersistentClient(path=CHROMA_DIR)


@app.post("/embed/")
async def embed_document(file_path: str = Form(...), doc_id: str = Form(...)):
    file_path = os.path.join("../server", file_path)

    # Load document
    loader = PyPDFLoader(file_path)
    pages = loader.load()

    all_chunks, page_nums = [], []
    for page in pages:
        text = page.page_content
        page_num = page.metadata["page"] + 1
        chunks = chunk_text(text, page_num)
        for chunk, page_no in chunks:
            all_chunks.append(chunk)
            page_nums.append(page_no)

    embeddings = transformer_model.encode(
        all_chunks, convert_to_numpy=True).tolist()

    collection_name = f"doc_{doc_id}"
    collection = chroma_client.get_or_create_collection(collection_name)

    collection.add(
        ids=[f"{doc_id}_{i}" for i in range(len(all_chunks))],  # Unique IDs
        embeddings=embeddings,
        metadatas=[{"page_number": page_no, "text": chunk}
                   for chunk, page_no in zip(all_chunks, page_nums)]
    )

    return {"message": "Document processed", "document_id": doc_id}


@app.get("/search/")
async def search(
    document_id: str,
    query: str,
    top_k: int = 5,
    start_page: int = Query(None),
    end_page: int = Query(None)
):
    collection_name = f"doc_{document_id}"
    collection = chroma_client.get_or_create_collection(collection_name)

    # 1. Generate similar questions using Gemini
    similar_questions_prompt = f"""Generate 5 different versions of the following question that ask for the same information but with different wording:

    Original question: {query}

    Return ONLY the 5 questions, one per line, with no additional text."""

    similar_questions_response = llm.invoke(similar_questions_prompt)
    # Extract content from AIMessage object
    response_text = similar_questions_response.content

    similar_questions = [query]  # Start with the original question

    # Parse the Gemini response to extract the questions
    for line in response_text.strip().split('\n'):
        if line and not line.startswith("Original question:") and len(similar_questions) < 6:
            clean_question = line
            # Remove leading numbers/formatting if they exist
            if re.match(r'^\d+[\.\)]\s+', clean_question):
                clean_question = re.sub(r'^\d+[\.\)]\s+', '', clean_question)
            similar_questions.append(clean_question)

    # 2. Get embeddings and search for each question
    all_results = []

    for question in similar_questions:
        # Format with prefix for embedding
        formatted_question = "search_query: " + question

        query_embedding = transformer_model.encode(
            ["search_query: " + query], normalize_embeddings=True)[0].tolist()

        # Build `where` clause for page range filtering
        where_filter = None
        if start_page is not None and end_page is not None:
            where_filter = {
                "$and": [
                    {"page_number": {"$gte": start_page}},
                    {"page_number": {"$lte": end_page}}
                ]
            }
        elif start_page is not None:
            where_filter = {"page_number": {"$gte": start_page}}
        elif end_page is not None:
            where_filter = {"page_number": {"$lte": end_page}}

        # Search in ChromaDB
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k,
            where=where_filter
        )
        print(results)

        # Add results to our collection
        for i in range(len(results["ids"][0])):
            result_item = {
                "id": results["ids"][0][i],
                "text": results["metadatas"][0][i]['text'],
                "distance": results["distances"][0][i],
                "question": question
            }
            all_results.append(result_item)

    print(all_results)
    # Remove duplicates (same text chunks retrieved by different questions)
    unique_results = []
    seen_texts = set()

    for result in all_results:
        if result["text"] not in seen_texts:
            seen_texts.add(result["text"])
            unique_results.append(result)

    # 3. Generate answer using combined context
    context = "\n\n".join(
        r['text'] for _, r in enumerate(unique_results))

    answer_prompt = f"""Given the following context, please answer the question accurately and concisely.

Question: {query}

Context:
{context}

Answer:"""

    answer_response = llm.invoke(answer_prompt)
    answer = answer_response.content

    # 4. Extract exact source text for the answer
    extraction_prompt = f"""Given the answer to a question and the context that was used to generate that answer, identify the EXACT sentences or phrases from the context that directly answer the question.

Question: {query}

Context:
{context}

Answer: {answer}

Return ONLY the exact text from the context (word for word) that contains the information used to answer the question. Follow these rules:
1. Provide each source as plain text with no added formatting
2. Do not add any explanations, numbering, or extra text
3. The text must be EXACT, word-for-word from the context
4. Include ONLY the specific sentences or phrases that directly answer the question
5. Do not modify, summarize, or add to the original text in any way

This is critically important for highlighting the exact text in the document.
"""

    exact_source_response = llm.invoke(extraction_prompt)
    exact_source = exact_source_response.content

    # 5. Return the complete response
    return {
        "query": query,
        "similar_questions": similar_questions,
        "answer": answer,
        "exact_source": exact_source,
        "context": [
            {
                "text": r["text"],
                "distance": r["distance"],
                "question": r["question"]
            }
            for r in unique_results
        ]
    }


def generate_quiz_structured(chunks: list) -> list:
    """Generates MCQs one at a time with explicit structure."""
    quiz = []

    print("CHUNKS")
    print(len(chunks))
    for chunk in chunks:
        prompt = f"""
        Based on the following text, generate 3 multiple-choice questions (MCQs):
        {chunk}

        For each question:
        1. Start with "QUESTION: " followed by the question text
        2. Then list "OPTIONS: " with four options labeled A, B, C, D
        3. End with "ANSWER: " followed by the letter of the correct option
        4. Add "END" after each complete question

        Example format:
        QUESTION: What is the capital of France?
        OPTIONS:
        A. London
        B. Paris
        C. Rome
        D. Berlin
        ANSWER: B
        END
        """

        try:
            response = model.generate_content(prompt)
            response_text = response.text.strip()

            # Parse structured format
            question_blocks = response_text.split("END")
            for block in question_blocks:
                if not block.strip():
                    continue

                parts = block.strip().split("OPTIONS:")
                if len(parts) != 2:
                    continue

                question_part = parts[0].replace("QUESTION:", "").strip()

                options_answer = parts[1].split("ANSWER:")
                if len(options_answer) != 2:
                    continue

                options_text = options_answer[0].strip()
                answer_letter = options_answer[1].strip()

                # Parse options
                options = []
                option_lines = options_text.strip().split("\n")
                for line in option_lines:
                    if not line.strip():
                        continue
                    if line[0] in "ABCD" and line[1] in ".: ":
                        options.append(line[2:].strip())

                if len(options) != 4:
                    continue

                # Get the answer text based on the letter
                letter_index = "ABCD".index(answer_letter)
                if letter_index < len(options):
                    answer = options[letter_index]

                    quiz.append({
                        "question": question_part,
                        "options": options,
                        "answer": answer
                    })
        except Exception as e:
            print(f"Error processing chunk: {e}")
            continue
    print(len(quiz))
    return quiz


@app.post("/generate-quiz/")
async def generate_quiz(file_path: str = Form(...), start_page: int = Form(...), end_page: int = Form(...)):
    text = extract_text_from_pdf(file_path, start_page, end_page)
    chunks = chunk_document(text)
    quiz_data = generate_quiz_structured(chunks)

    return {"quiz": quiz_data}
