from typing import TypedDict

from schemas import ResumeAnalysis, JDAnalysis , MatchAnalysis ,ValidationResult
from agents import resume_agent, jd_agent ,matching_agent , validator ,report_agent ,check_validation
from langgraph.graph import StateGraph, START, END


class AgentState(TypedDict):
    resume_text: str
    jd_text: str
    resume_analysis: ResumeAnalysis
    jd_analysis: JDAnalysis
    match_analysis: MatchAnalysis
    validation: ValidationResult



graph = StateGraph(AgentState)

graph.add_node("resume_agent", resume_agent)
graph.add_node("jd_agent", jd_agent)
graph.add_node("matching_agent", matching_agent)
graph.add_node("report_agent", report_agent)
graph.add_node("validator", validator)

graph.add_edge(START, "resume_agent")
graph.add_edge("resume_agent", "jd_agent")
graph.add_edge("jd_agent" , "matching_agent")
graph.add_edge("matching_agent", "report_agent")
graph.add_edge("report_agent", "validator")

graph.add_conditional_edges(
    "validator",
    check_validation,
    {
        "valid": END,
        "invalid": "report_agent"
    }
)
app = graph.compile()