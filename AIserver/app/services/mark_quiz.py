from app.prompts.quiz import mark_quiz_prompt
from app.core.model import model
import re


def mark_quiz(questions: list, answers: list, user_answers: list, types: list) -> dict:
    total_score = 0
    max_score = 0
    evaluations = []

    for i in range(len(questions)):
        correct = answers[i].strip().lower()
        user = user_answers[i].strip().lower()
        q_type = types[i].lower()

        if q_type in ["mcq", "true/false", "true_false"]:
            weight = 1
        elif q_type == "short":
            weight = 2
        elif q_type == "long":
            weight = 5
        else:
            weight = 0

        score = 0
        if q_type in ["mcq", "true/false", "true_false"]:
            score = 1 if correct == user else 0

            evaluations.append({
                "question": questions[i],
                "correct_answer": answers[i],
                "user_answer": user_answers[i],
                "question_type": q_type,
                "score": score,
                "out_of": weight,
                "justification": "Automatically marked (MCQ/True-False)"
            })

        else:

            prompt = mark_quiz_prompt(
                q_type=q_type,
                question=questions[i],
                answer=answers[i],
                user_answer=user_answers[i]
            )

            try:
                response = model.generate_content(prompt).text.strip()

                # Expecting format: Score: X/Y\nJustification: ...
                score_match = re.search(
                    r"Score:\s*(\d+)\s*/\s*(\d+)", response, re.IGNORECASE)
                justification_match = re.search(
                    r"Justification:\s*(.*)", response, re.IGNORECASE | re.DOTALL)

                if score_match:
                    score = int(score_match.group(1))
                    out_of = int(score_match.group(2))
                else:
                    score = 0
                    out_of = 2 if q_type == "short" else 5

                justification = justification_match.group(1).strip(
                ) if justification_match else "No justification provided."

                evaluations.append({
                    "question": questions[i],
                    "correct_answer": answers[i],
                    "user_answer": user_answers[i],
                    "question_type": q_type,
                    "score": score,
                    "out_of": out_of,
                    "justification": justification
                })

            except Exception as e:
                evaluations.append({
                    "question": questions[i],
                    "correct_answer": answers[i],
                    "user_answer": user_answers[i],
                    "question_type": q_type,
                    "score": 0,
                    "out_of": 2 if q_type == "short" else 5,
                    "justification": f"Evaluation failed: {str(e)}"
                })

        total_score += score
        max_score += weight

    return {
        "total_score": total_score,
        "max_score": max_score,
        "evaluations": evaluations
    }
