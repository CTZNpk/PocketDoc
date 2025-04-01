from app.core.model import model
from app.prompts.quiz import get_quiz_prompt_from_chunk
import re

def generate_quiz_from_chunks(chunks: list, answer_formats: list[str], question_type: str = "mixed") -> list:
    quiz = []
    
    for chunk_idx, chunk in enumerate(chunks):
        print(f"\nProcessing chunk {chunk_idx + 1}/{len(chunks)}")
        print(f"Chunk size: {len(chunk)} characters")
        print(f"First 100 chars: {chunk[:100]}...")
        
        prompt = get_quiz_prompt_from_chunk(chunk, answer_formats, question_type)
        print(f"\nPrompt sent to model:\n{prompt[:500]}...")  # Print first 500 chars of prompt

        try:
            # Get raw response from model
            response = model.generate_content(prompt).text.strip()
            print(f"\nRaw model response:\n{response[:1000]}...")  # Print first 1000 chars
            
            if not response or response.upper().strip() == "NO QUESTIONS":
                print("No questions generated for this chunk")
                continue

            # Improved question block parsing
            question_blocks = re.split(r'(?=\nQUESTION:|\n- [A-Za-z]+:)', response)
            print(f"Found {len(question_blocks)} potential question blocks")
            
            for block in question_blocks:
                if not block.strip():
                    continue
                    
                print(f"\nProcessing block:\n{block[:200]}...")
                
                q_data = {
                    "type": "multiple_choice",  # Default
                    "question": "",
                    "options": [],
                    "answer": ""
                }

                # Extract question type
                type_match = re.search(r'- (MCQ|Short|Long|True/False):', block, re.IGNORECASE)
                if type_match:
                    q_data["type"] = type_match.group(1).lower()
                
                # Extract question text
                question_match = re.search(r'QUESTION:\s*(.*?)(?=\nOPTIONS:|\nANSWER:|\n- |$)', block, re.DOTALL)
                if question_match:
                    q_data["question"] = question_match.group(1).strip()
                
                # Extract options (for MCQ/TrueFalse)
                if q_data["type"] in ["mcq", "true/false"]:
                    options_match = re.search(r'OPTIONS:\s*((?:[A-Z]\.\s*.*?\n)+)', block, re.DOTALL)
                    if options_match:
                        q_data["options"] = [
                            opt.strip() 
                            for opt in re.findall(r'[A-Z]\.\s*(.*?)(?=\n[A-Z]\.|\nANSWER:|$)', options_match.group(1))
                        ]
                
                # Extract answer
                answer_match = re.search(r'ANSWER:\s*(.*?)(?=\n- |\nQUESTION:|$)', block, re.DOTALL)
                if answer_match:
                    answer_text = answer_match.group(1).strip()
                    if q_data["options"] and answer_text in "ABCD":
                        idx = "ABCD".index(answer_text)
                        q_data["answer"] = q_data["options"][idx] if idx < len(q_data["options"]) else answer_text
                    else:
                        q_data["answer"] = answer_text
                
                # Validate and add question
                if q_data["question"] and q_data["answer"]:
                    print(f"Valid question found: {q_data["question"][:50]}...")
                    quiz.append(q_data)
                else:
                    print("Invalid question block - missing required fields")
                    print(f"Question: {bool(q_data["question"])}")
                    print(f"Answer: {bool(q_data["answer"])}")
                    print(f"Block content:\n{block[:200]}...")

        except Exception as e:
            print(f"Error processing chunk {chunk_idx + 1}: {str(e)}")
            continue
    
    print(f"\nTotal questions generated: {len(quiz)}")
    return quiz