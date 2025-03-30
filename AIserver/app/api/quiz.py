from fastapi import APIRouter, Form
from app.services.pdf_utils import extract_text_from_pdf, chunk_document
from app.services.quiz_generator import generate_quiz_from_chunks

router = APIRouter()


@router.post("/generate-quiz/")
async def generate_quiz(file_path: str = Form(...), start_page: int = Form(...), end_page: int = Form(...)):
    text = extract_text_from_pdf(file_path, start_page, end_page)
    chunks = chunk_document(text)
    quiz = generate_quiz_from_chunks(chunks)
    return {"quiz": quiz}
