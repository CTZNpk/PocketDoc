from fastapi import APIRouter, Form
from app.services.pdf_utils import extract_text_from_pdf, chunk_document, convert_summary_to_pdf
from app.services.summarizer import summarize_pdf

router = APIRouter()


@router.post("/summarize-doc/")
async def summarize_document(
    document_id: str = Form(...),
    file_path: str = Form(...),
    start_page: int = Form(...),
    end_page: int = Form(...),
    document_type: str = Form("general"),
    summary_length: int = Form(40),
    format_preference: str = Form("paragraph"),
    focus: str = Form("main ideas")
):
    text = extract_text_from_pdf(file_path, start_page, end_page)
    chunks = chunk_document(text)
    summary = summarize_pdf(
        chunks,
        document_type=document_type,
        summary_length=summary_length,
        format_preference=format_preference,
        focus=focus
    )
    convert_summary_to_pdf(
        summary, f"./summaries/test_{start_page}_{end_page}_summary.pdf")
    return {"summary": summary, "document_id": document_id, "start_page": start_page, "end_page": end_page}

