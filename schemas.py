from pydantic import BaseModel


class ResumeAnalysis(BaseModel):
    name: str
    skills: list[str]
    experience_years: float
    projects: list[str]


class JDAnalysis(BaseModel):
    job_title: str
    required_skills: list[str]
    experience_required: float
    responsibilities: list[str]