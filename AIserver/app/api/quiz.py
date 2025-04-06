from fastapi import APIRouter, Form
from app.services.pdf_utils import extract_text_from_pdf, chunk_document
from app.services.quiz_generator import generate_quiz_from_chunks

router = APIRouter()


@router.post("/generate-quiz/")
async def generate_quiz(
    file_path: str = Form(...),
    start_page: int = Form(...),
    end_page: int = Form(...),
    answer_formats: list[str] = Form(...),
    question_type: str = Form("mixed")
):
    text = extract_text_from_pdf(file_path, start_page, end_page)
    chunks = chunk_document(text, chunk_size=20000)
    quiz = generate_quiz_from_chunks(chunks, answer_formats, question_type)
    print("GEN QUIZ")
    print(quiz)
    return {"quiz": quiz}
