def get_format_instruction(format_preference: str) -> str:
    return {
        "bullet": "Use bullet points to present each idea clearly.",
        "paragraph": "Write in natural flowing paragraphs.",
        "outline": "Use an outline format with headings and subpoints."
    }.get(format_preference, "Write in natural flowing paragraphs.")


def get_common_instructions(summary_length: int, format_preference: str, focus: str, document_type: str) -> str:
    return f"""
- Document type: {document_type}
- Focus: {focus}
- Length: ~{summary_length}% of the original
- Format: {format_preference}
- Key Instructions: {get_format_instruction(format_preference)}

Use markdown:
- **Bold** for key terms
- Give Proper Markdown format which can be used by REACTMARKDOWN and reders perfectly in that ***IMPORTANT***
- CODE BLOCKS ONLY FOR CODE ELEMENTS DONOT WRAP any normal text in Code block i.e ``` ```
- DONOT WRAP OUTPUT IN ``` ``` and make it a CODE BLOCK

**IMPORTANT:**
- Maintain strict {summary_length}% length limit — even if important details are lost
- Do not add any information beyond the text
- Ensure clarity and avoid vague statements
"""


def get_summary_intro_prompt(text: str, document_type="general", summary_length=40, format_preference="paragraph", focus="main ideas") -> str:
    return f"""
Summarize this {document_type} document:

Instructions:
{get_common_instructions(
        summary_length, format_preference, focus, document_type)}

Text:
{text}

SUMMARY:
"""


def get_summary_continue_prompt(context: str, chunk: str, document_type="general", summary_length=40, format_preference="paragraph", focus="main ideas") -> str:
    return f"""
Here is the summary so far:
{context}

Continue the summary with the new section:
{chunk}

Instructions:
{get_common_instructions(
        summary_length, format_preference, focus, document_type)}

--You are a Summarizing model summarizing large text the previous summary has already been seen by the user it is necessary that you 
continue the summary forward donot repeat
Begin the summary immediately. Do not repeat previous content.

SUMMARY:
"""


def get_summarize_text_prompt(text: str, document_type="general", summary_length=40, format_preference="paragraph", focus="main ideas") -> str:
    return f"""
Summarize the following {document_type} document.

Instructions:
{get_common_instructions(
        summary_length, format_preference, focus, document_type)}

Text:
{text}

SUMMARY:
"""

