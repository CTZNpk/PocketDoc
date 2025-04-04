import re
from app.core.model import llm, embedding_model, chroma_client
from app.prompts.search import get_similar_questions_prompt, get_answer_prompt, get_extraction_prompt


def generate_similar_questions(query: str):
    prompt = get_similar_questions_prompt(query)
    response = llm.invoke(prompt)
    raw_lines = response.content.strip().split('\n')
    questions = [query]
    for line in raw_lines:
        if line and len(questions) < 6:
            if re.match(r'^\d+[\.)]\s+', line):
                line = re.sub(r'^\d+[\.)]\s+', '', line)
            questions.append(line)
    return questions


def applyFilters(start_page, end_page):
    where_filter = None

    if start_page is not None and end_page is not None:
        where_filter = {
            "$and": [
                {"page_number": {"$gte": start_page}},
                {"page_number": {"$lte": end_page}}
            ]
        }
    elif start_page is not None:
        where_filter = {"page_number": {"$gte": start_page}}
    elif end_page is not None:
        where_filter = {"page_number": {"$lte": end_page}}
    return where_filter


def search_document(document_id: str, query: str, top_k=5, start_page=None, end_page=None):
    collection = chroma_client.get_or_create_collection(f"doc_{document_id}")
    similar_questions = generate_similar_questions(query)
    all_results = []
    for question in similar_questions:
        embedding = embedding_model.encode(
            ["search_query: " + question], normalize_embeddings=True)[0].tolist()
        where_filter = applyFilters(start_page, end_page)

        results = collection.query(
            query_embeddings=[embedding], n_results=top_k, where=where_filter)
        for i in range(len(results["ids"][0])):
            all_results.append({
                "id": results["ids"][0][i],
                "text": results["metadatas"][0][i]['text'],
                "distance": results["distances"][0][i],
                "question": question
            })

    seen = set()
    unique = []
    for r in all_results:
        if r["text"] not in seen:
            seen.add(r["text"])
            unique.append(r)

    context = "\n\n".join([r['text'] for r in unique])

    answer_prompt = get_answer_prompt(query, context)
    answer = llm.invoke(answer_prompt).content

    extraction_prompt = get_extraction_prompt(query, context, answer)
    exact_source = llm.invoke(extraction_prompt).content

    return {
        "answer": answer,
        "exact_source": exact_source,
    }
