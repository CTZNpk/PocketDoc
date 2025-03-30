from app.core.model import model
from app.prompts.summarization import get_summary_continue_prompt, get_summary_intro_prompt, get_summarize_text_prompt


def summarize_text(passage: str, document_type: str, summary_length: str, format_preference: str, focus: str):
    prompt = get_summarize_text_prompt(
        passage, document_type, summary_length, format_preference, focus)
    print(prompt)
    try:
        response = model.generate_content(prompt)
        return {
            "summary": response.text,
            "model_used": "gemini-pro"
        }
    except Exception as e:
        return {"error": str(e)}


def summarize_pdf(
    chunks: list,
    document_type: str = "general",
    summary_length: int = 40,
    format_preference: str = "paragraph",
    focus: str = "main ideas"
) -> str:
    """Summarizes text using Gemini Pro with customizable formatting."""
    from app.core.model import model
    from app.prompts.summarization import get_summary_intro_prompt, get_summary_continue_prompt

    context = ""
    summaries = []

    for i, chunk in enumerate(chunks):
        if context:
            prompt = get_summary_continue_prompt(
                context, chunk,
                document_type=document_type,
                summary_length=summary_length,
                format_preference=format_preference,
                focus=focus
            )
        else:
            prompt = get_summary_intro_prompt(
                chunk,
                document_type=document_type,
                summary_length=summary_length,
                format_preference=format_preference,
                focus=focus
            )

        try:
            response = model.generate_content(prompt)
            summary = response.text.strip()
            if summary:
                summaries.append(summary)
                context += "\n" + summary
        except Exception as e:
            print(f"Error summarizing chunk {i}: {e}")
            continue

    return "\n\n".join(summaries)
