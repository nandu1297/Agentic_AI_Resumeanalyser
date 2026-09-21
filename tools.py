from langchain_core.tools import tool


@tool
def compare_skills(
    candidate_skills: list[str],
    required_skills: list[str]
) -> dict:
    """Compare candidate skills with required job skills."""

    candidate = {
        skill.lower()
        for skill in candidate_skills
    }

    required = {
        skill.lower()
        for skill in required_skills
    }

    return {
        "matching_skills": list(candidate & required),
        "missing_skills": list(required - candidate)
    }