from langchain_google_genai import ChatGoogleGenerativeAI
from schemas import ResumeAnalysis, JDAnalysis
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("google_api_key")

llm = ChatGoogleGenerativeAI(model = "gemini-3.5-flash",temperature = 0 ,api_key = api_key)


resume_llm = llm.with_structured_output(ResumeAnalysis)
jd_llm  = llm.with_structured_output(JDAnalysis)

def resume_agent(state):

    result = resume_llm.invoke(
        f"""
        Analyze this resume.

        Extract:
        - candidate name
        - skills
        - years of experience
        - projects

        Resume:
        {state["resume_text"]}
        """
    )

    return {
        "resume_analysis": result
    }

def jd_agent(state)
    
    result = jd_llm.invoke(f"""
        Analyze this job description.

        Extract:
        - job title
        - required skills
        - required experience
        - responsibilities

        Job Description:
        {state["jd_text"]}
        """
    )
    return {
        "jd_analysis": result
    }