def get_summary_intro_prompt(
    text: str,
    document_type: str = "general",
    summary_length: int = 40,
    format_preference: str = "paragraph",
    focus: str = "main ideas"
) -> str:

    format_instruction = {
        "bullet": "Use bullet points to present each idea clearly.",
        "paragraph": "Write in natural flowing paragraphs.",
        "outline": "Use an outline format with headings and subpoints."
    }.get(format_preference, "Write in natural flowing paragraphs.")

    return f"""
Summarize the following {document_type} document.

Instructions:
- Focus on: {focus}
- Summary length: approximately {summary_length}% of the original
- Formatting style: {format_preference}
- {format_instruction}
- Include specific details from the text.
- Ensure clarity and avoid vague statements.
- Do NOT add any information not found in the text.

Text:
{text}
begin the summary imediately
SUMMARY:
"""


def get_summary_continue_prompt(
    context: str,
    chunk: str,
    document_type: str = "general",
    summary_length: int = 40,
    format_preference: str = "paragraph",
    focus: str = "main ideas"
) -> str:

    format_instruction = {
        "bullet": "Use bullet points to present each idea clearly.",
        "paragraph": "Write in natural flowing paragraphs.",
        "outline": "Use an outline format with headings and subpoints."
    }.get(format_preference, "Write in natural flowing paragraphs.")

    return f"""
Here is the summary so far:
{context}

Continue the summary with the new section:
{chunk}

### Important Instructions:
- Document type: {document_type}
- Focus on: {focus}
- Target summary length: approximately {summary_length}% of the original
- Formatting style: {format_preference}
- {format_instruction}
- **Do NOT repeat previous content.**
- Extract only essential information from this section.
- Assume the reader has read previous summaries.

begin the summary imediately
SUMMARY:
"""


def get_summarize_text_prompt(
    text: str,
    document_type: str = "general",
    summary_length: int = 40,
    format_preference: str = "paragraph",
    focus: str = "main ideas"
) -> str:

    format_instruction = {
        "bullet": "Use bullet points to present each idea clearly.",
        "paragraph": "Write in natural flowing paragraphs.",
        "outline": "Use an outline format with headings and subpoints."
    }.get(format_preference, "Write in natural flowing paragraphs.")

    return f"""
Summarize the following {document_type} text.

Instructions:
- Focus on: {focus}
- Summary length: approximately {summary_length}% of the original
- Formatting style: {format_preference}
- {format_instruction}
- Include specific details from the text.
- Ensure clarity and avoid vague statements.
- Do NOT add any information not found in the text.

Text:
{text}

begin the summary imediately
SUMMARY:
"""
