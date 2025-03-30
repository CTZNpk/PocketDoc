from pydantic import BaseModel


class SummarizeRequest(BaseModel):
    passage: str
