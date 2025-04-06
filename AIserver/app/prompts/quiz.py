# prompts/quiz.py
def get_quiz_prompt_from_chunk(text: str, answer_formats: list[str], question_type: str = "mixed") -> str:
    format_instructions = []
    examples = []

    if "mcq" in answer_formats:
        format_instructions.append(
            "- multiple-choice questions (MCQs) with options A-D")
        examples.append("""
- MCQ:
QUESTION: ...
OPTIONS:
A. ...
B. ...
C. ...
D. ...
ANSWER: B
END""")

    if "true/false" in answer_formats:
        format_instructions.append("- True/False questions")
        examples.append("""
- True/False:
QUESTION: ...
ANSWER: True
END""")

    if "short" in answer_formats:
        format_instructions.append(
            "- short answer questions without options(1-2 lines answers)")
        examples.append("""
- Short:
QUESTION: ...
ANSWER: ...(1-2 lines answers)
END""")

    if "long" in answer_formats:
        format_instructions.append(
            "- long-form descriptive questions(descriptive answers)")
        examples.append("""
- Long:
QUESTION: ...
ANSWER: ... (Long descriptive answer expected)
END""")

    type_instruction = ""
    if question_type == "factual":
        type_instruction = "Focus only on fact-based questions like definitions, lists, or direct information from the text."
    elif question_type == "conceptual":
        type_instruction = "Generate questions that test understanding, reasoning, and interpretation based on the content."
    elif question_type == "mixed":
        type_instruction = "Include a mix of both factual and conceptual questions."

    return f"""
Based on the following text, generate only relevant questions of the following types:
- {'\n- '.join(format_instructions)}

If the text does not contain enough information for a relevant question type, do not generate that question.
If no questions are relevant at all, respond with: NO QUESTIONS

{text}

Instructions:
{type_instruction}

Format examples:
{''.join(examples)}
"""


def mark_quiz_prompt(q_type: str, question: str, answer: str, user_answer: str) -> str:
    max_score = 2 if q_type.lower() == "short" else 5

    grading_rule_line = ""
    if q_type.lower() == "short":
        grading_rule_line = "- This is a short question. Mark it out of 2."
    elif q_type.lower() == "long":
        grading_rule_line = "- This is a long question. Mark it out of 5."

    return f"""
You are an automated grading assistant.

Grade the following student's answer based on the correct answer and the question type.

Question: {question}

Correct Answer: {answer}

User Answer: {user_answer}

Question Type: {q_type.capitalize()}

Grading Rules:
{grading_rule_line}
- Award full marks for complete and accurate answers.
- Award partial marks for partially correct or incomplete answers.
- Award zero if the answer is incorrect, off-topic, or too vague.
- Show a little leniency in checking

Respond in the format:
Score: X/{max_score}
Justification: <why the user got this score>
"""
