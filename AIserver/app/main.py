from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import fitz
import os
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
from typing import List, Dict
import numpy as np


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
