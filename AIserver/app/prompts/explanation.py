def get_explanation_prompt(passage: str, detail_level: str):
    detail_instruction = {
        "simple": "Explain in very simple terms anyone can understand.",
        "medium": "Explain clearly with moderate detail suitable for students.",
        "in-depth": "Provide a thorough explanation with examples and technical depth."
    }.get(detail_level, "Explain clearly with moderate detail suitable for students.")

    return f"""
    Explain the following text:

    {passage}

    Instructions:
    - {detail_instruction}
    - Use plain language but keep it relevant to the original meaning.
    - Do not add unrelated information.
    """
