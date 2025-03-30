from fastapi import APIRouter, Form
from app.services.embedder import embed_pdf

router = APIRouter()


@router.post("/embed/")
async def embed_document(file_path: str = Form(...), doc_id: str = Form(...)):
    return embed_pdf(file_path, doc_id)
