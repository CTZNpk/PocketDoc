import os
import markdown
from weasyprint import HTML
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter


def extract_text_from_pdf(file_path: str, start_page: int, end_page: int) -> str:
    file_path = os.path.join('../server', file_path)
    loader = PyPDFLoader(file_path)
    pages = loader.load()[start_page - 1:end_page]
    return "\n\n".join([page.page_content for page in pages])


def chunk_document(text: str, chunk_size: int = 7500) -> list:
    splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=100)
    return splitter.split_text(text)


def convert_summary_to_pdf(summary_markdown: str, output_path: str):
    html = markdown.markdown(summary_markdown)
    styled_html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset=\"UTF-8\">
            <style>
                body {{ font-family: 'Times New Roman', Times, serif; }}
                strong {{ font-weight: bold; }}
                em {{ font-style: italic; }}
            </style>
        </head>
        <body>
            {html}
        </body>
        </html>
    """
    HTML(string=styled_html).write_pdf(output_path)
