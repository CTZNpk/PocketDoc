from app.core.model import model
from app.prompts.summarization import get_summary_continue_prompt, get_summary_intro_prompt, get_summarize_text_prompt


def summarize_text(passage: str):
    prompt = get_summarize_text_prompt(passage)
    try:
        response = model.generate_content(prompt)
        return {
            "summary": response.text,
            "model_used": "gemini-pro"
        }
    except Exception as e:
        return {"error": str(e)}


def summarize_pdf(chunks: list) -> str:
    """Summarizes text using Gemini Pro with Markdown formatting."""
    context = ""
    summaries = []
    print(len(chunks))
    i = 0
    for chunk in chunks:
        if context != "":
            prompt = get_summary_continue_prompt(context, chunk)
        else:
            prompt = get_summary_intro_prompt(chunk)
        response = model.generate_content(prompt)
        summary = response.text
        summaries.append(summary)
        context = summary  # Carry forward previous summary
        print(i)
        i += 1
        print(context)

    return "".join(summaries)
