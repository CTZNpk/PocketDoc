from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import fitz
import os
from pydantic import BaseModel
from langchain.prompts import ChatPromptTemplate
from langchain_ollama import ChatOllama


def get_application():
    _app = FastAPI()

    _app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "*"
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return _app


app = get_application()


@app.get("/")
def default():
    return "The Api is working"


@app.post("/extract-toc/")
async def extract_toc(filePath: str):
    pdf_path = os.path.abspath(f"../server/{filePath}")
    document = fitz.open(pdf_path)

    toc = document.get_toc(simple=True)
    num_pages = document.page_count

    filtered_toc = [
        {"Level": lvl, "Title": title, "Page": page}
        for lvl, title, page in (entry[:3] for entry in toc)
        if lvl < 3
    ]
    document.close()

    return {"TOC": filtered_toc, "totalPages": num_pages}


class SummarizeRequest(BaseModel):
    passage: str


local_model = "llama3.2:1b"
llm = ChatOllama(model=local_model)


@app.post("/summarize/")
async def summarize(request: SummarizeRequest):
    try:
        template = """Please Summarize this passage :
        Passage: {passage}
        """
        prompt = ChatPromptTemplate.from_template(template)

        llm_output = llm.invoke(
            prompt.format(passage=request.passage)
        )

        return {"summary": llm_output, "model_used": local_model}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
