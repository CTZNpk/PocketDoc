from fastapi import APIRouter, Form
from app.services.pdf_utils import extract_text_from_pdf, chunk_document
from app.services.quiz_generator import generate_quiz_from_chunks
from app.services.mark_quiz import mark_quiz


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


@router.post("/submit-quiz/")
async def submit_quiz(
    questions: list[str] = Form(...),
    answers: list[str] = Form(...),
    user_answers: list[str] = Form(...),
    types: list[str] = Form(...)
):
    response = mark_quiz(
        questions=questions,
        answers=answers,
        user_answers=user_answers,
        types=types
    )

    scaled_score = round(
        (response["total_score"] / response["max_score"]) * 100, 2
    ) if response["max_score"] else 0

    return {
        "percentage_score": scaled_score,
        **response
    }
