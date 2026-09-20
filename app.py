from fastapi import FastApi,UploadFile, File, Form
import fitz
from typing import TypedDict

app = FastApi()


# State that LangGraph will use later
class AgentState(TypedDict):
    resume_text: str
    jd_text: str



def extract_pdf_text(pdf_bytes: bytes) -> str:
    doc = fitz.open(
        stream=pdf_bytes,
        filetype="pdf"
    )

    text = ""

    for page in doc:
        text += page.get_text()

    doc.close()

    return text

@app.post("/analyze")
async def analyze(resume: UploadFile = File(...),job_description: str = Form(...)):
    
    pdfbytes = await resume.read()
    
    resume_txt= extract_pdf_text(pdfbytes)
    
    jd_text = job_description
    
    
    initial_state = {
        "resume_text": resume_txt,
        "jd_text": jd_text
    }

    # Temporary: return the state so we can test it
    return initial_state