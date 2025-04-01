from fastapi import APIRouter, Body
from pydantic import BaseModel
from app.services.summarizer import summarize_text

router = APIRouter()

class SummarizeRequest(BaseModel):
    passage: str
    document_type: str = "general"
    summary_length: int = 40
    format_preference: str = "paragraph"
    focus: str = "main ideas"

@router.post("/summarize/")
async def summarize(request: SummarizeRequest):
    return summarize_text(
        request.passage, request.document_type, request.summary_length,
        request.format_preference, request.focus
    )
