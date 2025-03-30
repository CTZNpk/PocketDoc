
from fastapi import APIRouter, Query
from app.services.search_engine import search_document

router = APIRouter()


@router.get("/search/")
async def search(document_id: str, query: str, top_k: int = 5, start_page: int = Query(None), end_page: int = Query(None)):
    return search_document(document_id, query, top_k, start_page, end_page)
