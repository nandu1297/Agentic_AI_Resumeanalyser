from fastapi import FastAPI,UploadFile, File, Form
from fastapi.responses import JSONResponse
import fitz
from typing import TypedDict
from graph import app as agent_graph

app = FastAPI()


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
    
    try:
        result = agent_graph.invoke(initial_state)
    except Exception:
        return JSONResponse(
            status_code=503,
            content={"detail": "Analysis is temporarily unavailable. Please try again in a moment."}
        )

    # Return final report
    return {
        "report": result["final_report"]
    }