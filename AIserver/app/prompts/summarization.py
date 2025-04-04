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
    Summarize this {document_type} document:

    Instructions:
    - Focus on: {focus}
    - Length: {summary_length}% of original text
    - Format: {format_preference}
    - Key Instructions: {format_instruction}
    - Include key details only
    - No information beyond the text
    - Strict {summary_length}% length limit

    Use markdown formatting:
    - **Bold** for key terms
    - Follow specified format style
    - Give proper headings if needed
    - No code blocks needed donot wrap in ``` ``` ***IMPORTANT***

    Text:
    {text}

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

### Summary Instructions:
- Document type: {document_type}
- Focus: {focus}
- Length: ~{summary_length}% of original
- Format: {format_preference}
- Key Instructions: {format_instruction}

Use markdown:
- **Bold** for key terms
- Follow specified format
- Give proper headings if needed
- No code blocks needed donot wrap in ``` ``` ***IMPORTANT***

**Important:**
- Do not repeat previous content
- No information beyond the text
- Maintain strict {summary_length}% length limit

Begin the summary immediately no introductory sentence
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
        Summarize the following {document_type} document.

        Instructions:
        - Focus on: {focus}
        - Summary length: approximately {summary_length}% of the original
        - Formatting style: {format_preference}
        - {format_instruction}
        - Ensure clarity and avoid vague statements.
        - Do NOT add any information not found in the text.
        - Respond in **markdown format**:
          - Use **bold** for key terms or important points.
          - Use bullet points or numbered lists if the format is "bullet_points".
          - Use headings (e.g., `#`, `##`) for sections if the format is "headings".
          - For "paragraph" format, use clear markdown-formatted paragraphs.
        **IMPORTANT**
        GENERATING SUMMARY {summary_length}% IS IMPORTANT EVEN IF IT MEANS LEAVING DETAIL OF IMPORTANT THINGS
        THIS IS A STRICT WORD LIMIT {summary_length}% OF THE ORIGINAL

        Text:
        {text}
        SUMMARY:
        """
