from app.core.model import model
from app.prompts.quiz import get_quiz_prompt_from_chunk
import re


def generate_quiz_from_chunks(chunks: list, answer_formats: list[str], question_type: str = "mixed") -> list:
    quiz = []
    for chunk in chunks:
        prompt = get_quiz_prompt_from_chunk(
            chunk, answer_formats, question_type)
        try:
            response = model.generate_content(prompt).text.strip()

            if response.upper().strip() == "NO QUESTIONS":
                continue

            question_blocks = response.split("END")
            for block in question_blocks:
                block = block.strip()
                if not block:
                    continue
                q_data = {}
                lines = block.splitlines()
                current_type = None
                options_started = False
                collecting_answer = False
                answer_lines = []

                for i, line in enumerate(lines):
                    line = line.strip()
                    # Detect type from first line if it matches our format: - Short:, - Long:, etc.
                    if i == 0 and re.match(r"^- (MCQ|Short|Long|True/False):", line, re.IGNORECASE):
                        current_type = re.findall(
                            r"^- (.*?):", line)[0].strip().lower()
                        q_data["type"] = current_type
                    elif line.startswith("QUESTION:"):
                        q_data["question"] = line.replace(
                            "QUESTION:", "").strip()
                    elif line.startswith("OPTIONS:"):
                        q_data["options"] = []
                        options_started = True
                    elif options_started and line.startswith(tuple("ABCD")) and "." in line:
                        q_data["options"].append(line[2:].strip())
                    elif line.startswith("ANSWER:"):
                        answer_text = line.replace("ANSWER:", "").strip()
                        collecting_answer = True
                        if "options" in q_data and answer_text in "ABCD":
                            idx = "ABCD".index(answer_text)
                            q_data["answer"] = q_data["options"][idx] if idx < len(
                                q_data["options"]) else answer_text
                            collecting_answer = False
                        else:
                            answer_lines = [answer_text] if answer_text else []
                    elif collecting_answer:
                        answer_lines.append(line)

                if collecting_answer and answer_lines:
                    q_data["answer"] = " ".join(answer_lines).strip()

                if "question" in q_data and "answer" in q_data and "type" in q_data:
                    quiz.append(q_data)
        except Exception as e:
            print(f"Error generating quiz: {e}")
            continue
    return quiz

