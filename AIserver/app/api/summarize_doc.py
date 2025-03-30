from fastapi import APIRouter, Form
from app.services.pdf_utils import extract_text_from_pdf, chunk_document, convert_summary_to_pdf
from app.services.summarizer import summarize_text, summarize_pdf

router = APIRouter()


@router.post("/summarize-doc/")
async def summarize_document(file_path: str = Form(...), start_page: int = Form(...), end_page: int = Form(...)):
    text = extract_text_from_pdf(file_path, start_page, end_page)
    chunks = chunk_document(text)
    print(chunks)
    print("WE ARE BEFORE THE SUMMARY")
    summary = summarize_pdf(chunks)
    print("HERE WE ARE")
    convert_summary_to_pdf(
        summary, f"./summaries/test_{start_page}_{end_page}_summary.pdf")
    return {"summary": summary}
