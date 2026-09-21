export type NavItem = "analyze" | "history" | "about";
export type View = "landing" | NavItem;

export interface FinalReport {
  matching_skills: string[];
  missing_skills: string[];
  experience_match: boolean;
  strengths: string[];
  gaps: string[];
  recommendations: string[];
}

export interface AnalysisResponse {
  report: FinalReport;
}
