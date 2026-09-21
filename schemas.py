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
    
class MatchAnalysis(BaseModel):
    matching_skills: list[str]
    missing_skills: list[str]
    experience_match: bool
    
class FinalReport(BaseModel):
    matching_skills: list[str]
    missing_skills: list[str]
    experience_match: bool
    strengths: list[str]
    gaps: list[str]
    recommendations: list[str]
    
class ValidationResult(BaseModel):
    valid: bool
    issues: list[str]