def get_summary_intro_prompt(text: str) -> str:
    return f"""
Summarize the text below and return response parsable as markdown:
1. Include specific details from the text.
2. Ensure clarity and avoid vague statements.
3. Keep concise with 30%-40% of original length.
4. Do not add any information not in the text.

Text: {text}
"""


def get_summary_continue_prompt(context: str, chunk: str) -> str:
    return f"""
Here is the summary so far:
{context}

Continue the summary with the new section:
{chunk}

### Important Instructions:
- **Do NOT repeat previous content.**
- Extract **only essential info** (~50% of key points).
- Use **Markdown**: `##` for headings, `**bold**` key terms.
- Assume the reader has read previous summary.
"""


def get_summarize_text_prompt(text: str) -> str:
    return f"""Summarize the text below and return response parsable as markdown:
        1. Include specific details from the text.
        2. Ensure clarity and avoid vague statements.
        3. Keep concise with 30%-40% of original length
        4. Please make the summary relevant only to the passage provided please do not add any additional information

        Text: {text}
        """
