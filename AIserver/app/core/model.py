# import google.generativeai as genai
# from langchain_google_genai import ChatGoogleGenerativeAI
# from sentence_transformers import SentenceTransformer
# import chromadb
# import os

# from .config import GEMINI_API_KEY

# genai.configure(api_key=GEMINI_API_KEY)

# model = genai.GenerativeModel('gemini-2.0-flash')
# llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash")

# embedding_model = SentenceTransformer(
#     "nomic-ai/nomic-embed-text-v1", trust_remote_code=True)

# CHROMA_DIR = "chroma_dbs"
# os.makedirs(CHROMA_DIR, exist_ok=True)
# chroma_client = chromadb.PersistentClient(path=CHROMA_DIR)

import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import os

from .config import GEMINI_API_KEY

genai.configure(api_key="")

model = genai.GenerativeModel('gemini-2.0-flash')
llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash",api_key="")

embedding_model = SentenceTransformer(
    "nomic-ai/nomic-embed-text-v1", trust_remote_code=True)

FAISS_INDEX_PATH = "faiss_index"
os.makedirs(FAISS_INDEX_PATH, exist_ok=True)

# Initialize FAISS index (assuming 768-d embeddings, change if needed)
dimension = 768  # Update if your embedding size is different
index = faiss.IndexFlatL2(dimension)

# Function to add embeddings to FAISS index
def add_to_faiss(vectors):
    vectors = np.array(vectors).astype('float32')
    index.add(vectors)

# Function to search FAISS index
def search_faiss(query_vector, top_k=5):
    query_vector = np.array(query_vector).astype('float32').reshape(1, -1)
    distances, indices = index.search(query_vector, top_k)
    return indices, distances
