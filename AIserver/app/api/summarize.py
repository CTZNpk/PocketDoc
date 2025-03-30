from fastapi import APIRouter
from app.models.schemas import SummarizeRequest
from app.services.summarizer import summarize_text

router = APIRouter()


@router.post("/summarize/")
async def summarize(request: SummarizeRequest):
    return summarize_text(request.passage)
