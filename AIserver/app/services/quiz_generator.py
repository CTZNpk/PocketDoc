from app.core.model import model
from app.prompts.quiz import get_quiz_prompt_from_chunk


def generate_quiz_from_chunks(chunks: list):
    quiz = []
    for chunk in chunks:
        prompt = get_quiz_prompt_from_chunk(chunk)
        try:
            response = model.generate_content(prompt).text.strip()
            question_blocks = response.split("END")
            for block in question_blocks:
                if not block.strip():
                    continue
                parts = block.strip().split("OPTIONS:")
                if len(parts) != 2:
                    continue
                question_text = parts[0].replace("QUESTION:", "").strip()
                options_answer = parts[1].split("ANSWER:")
                if len(options_answer) != 2:
                    continue
                options_lines = options_answer[0].strip().split("\n")
                answer_letter = options_answer[1].strip()
                options = [line[2:].strip()
                           for line in options_lines if line and line[0] in "ABCD"]
                if len(options) != 4:
                    continue
                correct_index = "ABCD".index(answer_letter)
                quiz.append({
                    "question": question_text,
                    "options": options,
                    "answer": options[correct_index]
                })
        except Exception:
            continue
    return quiz
