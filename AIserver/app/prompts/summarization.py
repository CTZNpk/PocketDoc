def get_format_instruction(format_preference: str) -> str:
    return {
        "bullet": "Use bullet points to present each idea clearly.",
        "paragraph": "Write in natural flowing paragraphs.",
        "outline": "Use an outline format with headings and subpoints."
    }.get(format_preference, "Write in natural flowing paragraphs.")


def get_common_instructions(summary_length: int, format_preference: str, focus: str, document_type: str) -> str:
    return f"""
You are a Markdown formatting expert.

Summarize the following {document_type} document using **clean and properly rendered Markdown**.

---

**SUMMARY INSTRUCTIONS:**
- Focus on: **{focus}**
- Length: **~{summary_length}%** of the original
- Format style: **{format_preference}**
- Important: be concise, structured, and markdown-compliant.

---

**MARKDOWN RULES** (follow strictly):

**Headings:**
- Use `#`, `##`, `###` etc. for titles and sections
- No bold-wrapping of headings (e.g., ❌ `# **Title**`) — use plain `# Title`

**Lists and Bullets:**
- Each bullet must be on a **separate line**
- Use `*` or `-` for unordered lists
- Use `1.`, `2.`, etc. for ordered steps
- Add **one empty line** between list blocks

**Bold:**
- Use `**bold**` for emphasis on terms or headings

**Code blocks (Important!):**
- Use triple backticks (```) **only for actual terminal/code snippets**
- **DO NOT** wrap normal text, bullets, or whole sections in code blocks
- **DO NOT** use ` ```markdown ` — use plain markdown output only

**Avoid escape characters:**
- DO NOT output text with `\\n`, `\\t`, `\\` etc.
- Simply use real newlines (hit Enter/Return in your output)

---

**Your Response MUST be clean, readable, and fully Markdown-rendered**.

Begin the summary now:
"""


def get_summary_intro_prompt(text: str, document_type="general", summary_length=40, format_preference="paragraph", focus="main ideas") -> str:
    return f"""
Summarize this {document_type} document:

Instructions:
{get_common_instructions(
        summary_length, format_preference, focus, document_type)}

Text:
{text}


BEGIN IMMEDIATELY NO INTRO SENTENCE
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

BEGIN IMMEDIATELY NO INTRO SENTENCE
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

BEGIN IMMEDIATELY NO INTRO SENTENCE
SUMMARY:
"""
