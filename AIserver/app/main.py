from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import fitz
import os


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

    filtered_toc = [
        {"Level": lvl, "Title": title, "Page": page}
        for lvl, title, page in (entry[:3] for entry in toc)
    ]
    document.close()

    return {"TOC": filtered_toc}
