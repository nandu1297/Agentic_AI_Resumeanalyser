from typing import TypedDict

from schemas import ResumeAnalysis, JDAnalysis , MatchAnalysis
from agents import resume_agent, jd_agent ,matching_agent
from langgraph.graph import StateGraph, START, END


class AgentState(TypedDict):
    resume_text: str
    jd_text: str
    resume_analysis: ResumeAnalysis
    jd_analysis: JDAnalysis
    match_analysis: MatchAnalysis



graph = StateGraph(AgentState)

graph.add_node("resume_agent", resume_agent)
graph.add_node("jd_agent", jd_agent)
graph.add_node("matching_agent", matching_agent)

graph.add_edge(START, "resume_agent")
graph.add_edge("resume_agent", "jd_agent")
graph.add_edge("jd_agent" , "matching_agent")