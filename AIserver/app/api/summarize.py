from fastapi import APIRouter, Form
from app.services.summarizer import summarize_text

router = APIRouter()


@router.post("/summarize/")
async def summarize(
    passage: str = Form(...),
    document_type: str = Form("general"),
    summary_length: int = Form(40),
    format_preference: str = Form("paragraph"),
    focus: str = Form("main ideas")
):
    return summarize_text(passage, document_type, summary_length, format_preference, focus)
