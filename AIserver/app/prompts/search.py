def get_similar_questions_prompt(query: str) -> str:
    return f"""
Generate 5 different versions of the following question:
Original question: {query}
Return ONLY the 5 questions, one per line.
"""


def get_answer_prompt(query: str, context: str) -> str:
    return f"""
Answer the following based on context:
Question: {query}
Context:
{context}
Answer:
"""


def get_extraction_prompt(query: str, context: str, answer: str) -> str:
    return f"""
Extract exact source for:
Question: {query}
Context:
{context}
Answer: {answer}
Return only exact text from context that supports the answer.
"""
