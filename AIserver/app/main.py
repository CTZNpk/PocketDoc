from fastapi import FastAPI, HTTPException, Form
import markdown
from langchain.document_loaders import PyPDFLoader
from weasyprint import HTML
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
