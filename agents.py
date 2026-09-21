from langchain_google_genai import ChatGoogleGenerativeAI
from schemas import ResumeAnalysis, JDAnalysis ,MatchAnalysis, FinalReport
from dotenv import load_dotenv
import os
from tools import compare_skills

load_dotenv()
api_key = os.getenv("google_api_key")

llm = ChatGoogleGenerativeAI(model = "gemini-3.5-flash",temperature = 0 ,api_key = api_key)


resume_llm = llm.with_structured_output(ResumeAnalysis)
jd_llm  = llm.with_structured_output(JDAnalysis)
match_llm = llm.bind_tools([compare_skills])

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

def matching_agent(state):

    resume = state["resume_analysis"]
    jd = state["jd_analysis"]

    response = match_llm.invoke(
        f"""
        Compare the candidate's skills with the job requirements.

        Candidate skills:
        {resume.skills}

        Required skills:
        {jd.required_skills}

        Use the compare_skills tool.
        """
    )

    tool_call = response.tool_calls[0]

    tool_result = compare_skills.invoke(
        tool_call["args"]
    )

    return {
        "match_analysis": MatchAnalysis(
            matching_skills=tool_result["matching_skills"],
            missing_skills=tool_result["missing_skills"],
            experience_match=(
                resume.experience_years >= jd.experience_required
            )
        )
    }

report_llm = llm.with_structured_output(FinalReport)