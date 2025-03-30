from fastapi import FastAPI
from app.core.config import add_cors
from app.api import summarize, summarize_doc, embed, search, quiz

app = FastAPI()
add_cors(app)

app.include_router(summarize.router)
app.include_router(summarize_doc.router)
app.include_router(embed.router)
app.include_router(search.router)
app.include_router(quiz.router)


@app.get("/")
def root():
    return "The API is working"
