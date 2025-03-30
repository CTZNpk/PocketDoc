from fastapi import Form, APIRouter
from app.prompts.explanation import get_explanation_prompt
from app.core.model import model


router = APIRouter()


@router.post("/explanation/")
async def explain_text(
    passage: str = Form(...),
    detail_level: str = Form("medium")  # can be: simple, medium, in-depth
):

    prompt = get_explanation_prompt(passage,  detail_level)
    print(prompt)
    response = model.generate_content(prompt)
    return {
        "explanation": response.text.strip(),
        "detail_level": detail_level
    }
