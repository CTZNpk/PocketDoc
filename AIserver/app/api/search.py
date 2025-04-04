
from fastapi import APIRouter, Form
from app.services.search_engine import search_document

router = APIRouter()


router = APIRouter()


@router.post("/search/")
async def search(
    document_id: str = Form(...),
    query: str = Form(...),
    top_k: int = Form(5),
    start_page: int = Form(...),
    end_page: int = Form(...)
):
    return search_document(document_id, query, top_k, start_page, end_page)
