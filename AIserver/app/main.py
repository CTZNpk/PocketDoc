from fastapi import FastAPI, HTTPException, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import markdown2
from typing import Dict
import fitz
import os
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
import numpy as np
from fpdf import FPDF
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain.chains.summarize import load_summarize_chain


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


@app.get("/")
def default():
    return "The Api is working"


@app.post("/extract-toc/")
async def extract_toc(filePath: str):
    pdf_path = os.path.abspath(f"../server/{filePath}")
    document = fitz.open(pdf_path)

    toc = document.get_toc(simple=True)
    num_pages = document.page_count

    filtered_toc = [
        {"Level": lvl, "Title": title, "Page": page}
        for lvl, title, page in (entry[:3] for entry in toc)
        if lvl < 3
    ]
    document.close()

    return {"TOC": filtered_toc, "totalPages": num_pages}


class SummarizeRequest(BaseModel):
    passage: str


local_model = "gemini"

load_dotenv()
api_key = os.getenv("GEMINI_API")

genai.configure(api_key=api_key)

# Initialize model
model = genai.GenerativeModel('gemini-pro')


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


def split_document_by_font_size(pdf_path: str, font_scale: float = 1.2) -> [Dict]:
    """
    Splits PDF into sections based on font size thresholds.
    Returns list of {heading: str, content: str, page: int}.
    """
    doc = fitz.open(pdf_path)
    sections = []
    current_section = {"heading": "Introduction", "content": "", "page": 1}
    all_font_sizes = []

    # First pass: Collect all font sizes to determine thresholds
    for page in doc:
        blocks = page.get_text("dict")["blocks"]
        for b in blocks:
            if "lines" in b:
                for line in b["lines"]:
                    for span in line["spans"]:
                        all_font_sizes.append(span["size"])

    median_font_size = np.median(all_font_sizes)
    heading_threshold = median_font_size * font_scale

    for page_num, page in enumerate(doc, start=1):
        blocks = page.get_text("dict")["blocks"]
        for b in blocks:
            if "lines" in b:
                for line in b["lines"]:
                    text = ""
                    is_heading = False
                    for span in line["spans"]:
                        text += span["text"]
                        # Check if any span in the line exceeds threshold
                        if span["size"] > heading_threshold:
                            is_heading = True

                    if is_heading:
                        # Save current section
                        if current_section["content"].strip():
                            sections.append(current_section)
                        # Start new section
                        current_section = {
                            "heading": text.strip(),
                            "content": "",
                            "page": page_num
                        }
                    else:
                        current_section["content"] += text + "\n"

    # Add final section
    if current_section["content"].strip():
        sections.append(current_section)

    return sections


class PDF(FPDF):
    def add_markdown(self, md_content):
        """
        Parse Markdown content and add it to the PDF with proper formatting.
        """
        lines = markdown2.markdown(md_content).splitlines()

        for line in lines:
            if line.startswith("<h1>") and line.endswith("</h1>"):
                self.set_font("Arial", "B", 16)
                self.cell(0, 10, txt=line[4:-5], ln=True)
                self.ln(5)
            elif line.startswith("<h2>") and line.endswith("</h2>"):
                self.set_font("Arial", "B", 14)
                self.cell(0, 8, txt=line[4:-5], ln=True)
                self.ln(4)
            elif line.startswith("<ul>"):
                self.ln(2)
            elif line.startswith("<li>") and line.endswith("</li>"):
                self.set_font("Arial", size=12)
                self.cell(10)  # Indentation for bullet points
                self.cell(0, 6, txt=f"- {line[4:-5]}", ln=True)
            elif line.startswith("<p>") and line.endswith("</p>"):
                self.set_font("Arial", size=12)
                self.multi_cell(0, 8, txt=line[3:-4])
                self.ln(2)


def save_markdown_to_pdf(md_content, pdf_file):
    pdf = PDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()

    # Add Markdown content
    pdf.add_markdown(md_content)

    # Save to PDF
    pdf.output(pdf_file)


def hierarchical_summarize(text: str, chunk_size: int = 15000, overlap: int = 4000) -> str:
    """
    Summarizes long text using Gemini with hierarchical merging.
    """
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=overlap,
        separators=["\n\n## ", "\n\n", "\n", ". "]
    )

    docs = text_splitter.create_documents([text])
    llm = GoogleGenerativeAI(model="gemini-pro")
    prompt_template = PromptTemplate(
        template="""
        **Summarize this text section** focusing on:
        - Key concepts and entities
        - Important examples and figures
        - Relationships between ideas
        - Make the summary about 40-50% of the original
        - Please keep all the headings present in the text and summarize inside the headings
        
        Text: {text}
        """,
        input_variables=["text"]
    )

    summary_chain = load_summarize_chain(
        llm=llm,
        chain_type="map_reduce",
        map_prompt=prompt_template,
        combine_prompt=prompt_template,
        verbose=False
    )

    initial_summaries = [summary_chain.run([doc]) for doc in docs]

    def recursive_merge(summaries: list) -> str:
        if len(summaries) == 1:
            return summaries[0]

        merged = []
        for i in range(0, len(summaries), 2):
            pair = summaries[i:i + 2]
            if len(pair) == 1:
                merged.append(pair[0])
                continue

            overlap_text = "\n".join([
                text_splitter.split_text(pair[0])[-1],
                text_splitter.split_text(pair[1])[0]
            ])

            overlap_prompt = f"""
            **Summarize the overlap text below** while preserving key details and resolving ambiguities:

            Overlap Text:
            {overlap_text}

            Summarized Overlap:
            """
            overlap_response = llm.invoke(overlap_prompt).strip()
            merged_summary = f"""
            {pair[0]}
            {overlap_response}
            {pair[1]}
            """
            merged.append(merged_summary.strip())

        return recursive_merge(merged)

    return recursive_merge(initial_summaries)


@app.post("/summarize-doc")
async def summarize_pdf(file_path: str = Form(...), start_page: int = Form(...), end_page: int = Form(...)):
    # Read and extract text from the uploaded PDF
    if not os.path.exists(file_path):
        return JSONResponse(content={"error": "File not found."}, status_code=404)

    with fitz.open(file_path) as doc:
        if start_page < 1 or end_page > len(doc) or start_page > end_page:
            return JSONResponse(content={"error": "Invalid page range."}, status_code=400)

        # Extract text between the specified pages
        text = "".join([doc[page - 1].get_text()
                       for page in range(start_page, end_page + 1)])
    summary = hierarchical_summarize(text)

    # Save summary as PDF
    output_pdf = f"summaries/{os.path.basename(
        file_path).split('.')[0]}_summary.pdf"
    os.makedirs(os.path.dirname(output_pdf), exist_ok=True)
    save_markdown_to_pdf(summary, output_pdf)
    summary_html = markdown2.markdown(summary)

    return {
        "summary": summary_html,
        "pdf_path": output_pdf
    }
