"use client";

import { useMemo, useState } from "react";
import { AnalyzeButton } from "@/components/AnalyzeButton";
import { AnalysisResult } from "@/components/AnalysisResult";
import { JobDescriptionInput } from "@/components/JobDescriptionInput";
import { LoadingState } from "@/components/LoadingState";
import { ResumeUpload } from "@/components/ResumeUpload";
import { Sidebar, mobileNavItems } from "@/components/Sidebar";
import type { AnalysisResponse, FinalReport, View } from "@/components/types";

const emptyReport: FinalReport = {
  matching_skills: [],
  missing_skills: [],
  experience_match: false,
  strengths: [],
  gaps: [],
  recommendations: [],
};

const workflowSteps = [
  "Resume",
  "Job Description",
  "AI Analysis",
  "Skills Match",
  "Strengths & Gaps",
  "Recommendations",
];

const techItems = [
  "Agentic AI",
  "LangGraph",
  "Tool Calling",
  "Structured Output",
  "AI Validation",
];

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "";

export default function Home() {
  const [view, setView] = useState<View>("landing");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<FinalReport | null>(null);

  const isAnalyzeDisabled = !resumeFile || jobDescription.trim().length === 0 || loading;

  const currentApiUrl = useMemo(() => {
    if (apiBaseUrl) return apiBaseUrl.replace(/\/+$/, "");
    return "";
  }, []);

  const handleAnalyze = async () => {
    if (isAnalyzeDisabled) {
      setError("Please upload a resume and add a job description before analyzing.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile as File);
      formData.append("job_description", jobDescription);

      const endpoint = currentApiUrl ? `${currentApiUrl}/analyze` : "/analyze";

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const fallbackMessage = "Analysis is temporarily unavailable. Please try again in a moment.";
        const errorText = await response.text();

        if (errorText && errorText.length < 400) {
          throw new Error(errorText);
        }

        if (response.status === 429 || response.status === 503 || response.status === 500) {
          throw new Error(fallbackMessage);
        }

        if (response.status >= 400 && response.status < 500) {
          throw new Error("The request could not be processed. Please check your resume and job description and try again.");
        }

        throw new Error(fallbackMessage);
      }

      const data = (await response.json()) as AnalysisResponse;
      const parsedReport = data?.report ?? emptyReport;
      setReport(parsedReport);
      setView("analyze");
    } catch (requestError) {
      const message = requestError instanceof Error && requestError.message
        ? requestError.message
        : "Analysis is temporarily unavailable. Please try again in a moment.";

      const friendlyMessage = message.includes("503") || message.includes("429") || message.includes("quota") || message.includes("rate") || message.includes("temporarily unavailable")
        ? "Analysis is temporarily unavailable. Please try again in a moment."
        : message;

      setError(friendlyMessage);
      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  const renderMobileNav = (active: View) => (
    <div className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 px-4 py-3 backdrop-blur-md md:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="text-lg font-semibold text-zinc-900">ResumeLens AI</div>
        <div className="flex items-center gap-2">
          {mobileNavItems.map((item) => {
            const isActive = active === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                className={[
                  "rounded-full px-3 py-1.5 text-xs font-medium transition",
                  isActive ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-700",
                ].join(" ")}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderLandingPage = () => (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {renderMobileNav("landing")}
      <header className="mb-12 flex items-center justify-between">
        <div className="text-2xl font-semibold tracking-[-0.04em] text-zinc-900">
          ResumeLens AI
        </div>
        <button
          type="button"
          onClick={() => setView("analyze")}
          className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
        >
          Open Analyzer
        </button>
      </header>

      <main className="space-y-12">
        <section className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_30px_80px_rgba(24,24,27,0.06)] sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
                AI Resume Intelligence
              </p>
              <h1 className="max-w-xl text-4xl font-semibold tracking-[-0.06em] text-zinc-900 sm:text-5xl lg:text-6xl">
                See how your resume fits the role.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">
                ResumeLens AI compares your resume against a job description to highlight your skills, strengths, gaps, and recommendations.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => setView("analyze")}
                  className="rounded-full bg-zinc-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-zinc-800"
                >
                  Analyze My Resume
                </button>
              </div>
            </div>

            <div className="rounded-[28px] border border-zinc-200 bg-zinc-50 p-6">
              <div className="space-y-4">
                {workflowSteps.map((step, index) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-xs font-medium text-white">
                      {index + 1}
                    </div>
                    <div className="text-sm font-medium text-zinc-700">{step}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-zinc-200 bg-white p-6 sm:p-8">
          <p className="text-lg font-medium text-zinc-900">
            Upload your resume and paste a job description. ResumeLens AI analyzes your skills, experience, strengths, gaps, and overall alignment with the role.
          </p>
        </section>

        <section className="rounded-[28px] border border-zinc-200 bg-white p-6 sm:p-8">
          <h2 className="mb-6 text-2xl font-semibold tracking-[-0.04em] text-zinc-900">
            How it works
          </h2>
          <div className="grid gap-5 md:grid-cols-5">
            {workflowSteps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
                  {index + 1}
                </p>
                <p className="text-sm font-medium text-zinc-800">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-zinc-200 bg-white p-6 sm:p-8">
          <h2 className="mb-6 text-2xl font-semibold tracking-[-0.04em] text-zinc-900">
            Built with modern AI tooling
          </h2>
          <div className="flex flex-wrap gap-3">
            {techItems.map((item) => (
              <span
                key={item}
                className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );

  const renderAnalyzerPage = () => (
    <div className="flex min-h-screen bg-zinc-50 text-zinc-900">
      {renderMobileNav("analyze")}
      <Sidebar
        activeView="analyze"
        onNavigate={(nextView) => {
          if (nextView === "analyze") {
            setView("analyze");
            return;
          }

          setView(nextView);
        }}
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
                Analyze
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-zinc-900">
                Resume Match Review
              </h1>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <ResumeUpload file={resumeFile} onFileChange={setResumeFile} />
            <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />
          </div>

          <div className="mt-6">
            <AnalyzeButton
              disabled={isAnalyzeDisabled}
              loading={loading}
              onClick={handleAnalyze}
            />
          </div>

          {error ? (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span>{error}</span>
                <button
                  type="button"
                  onClick={handleAnalyze}
                  className="rounded-full border border-red-200 bg-white px-3 py-1.5 font-medium text-red-700 transition hover:bg-red-100"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : null}

          <div className="mt-8">
            {loading ? (
              <LoadingState />
            ) : report ? (
              <AnalysisResult report={report} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );

  const renderHistoryPage = () => (
    <div className="flex min-h-screen bg-zinc-50 text-zinc-900">
      {renderMobileNav("history")}
      <Sidebar activeView="history" onNavigate={(nextView) => setView(nextView)} />
      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="rounded-[28px] border border-zinc-200 bg-white p-10 text-center shadow-[0_12px_30px_rgba(24,24,27,0.04)]">
          <h2 className="text-2xl font-semibold tracking-[-0.05em] text-zinc-900">History</h2>
          <p className="mt-3 text-base text-zinc-600">Coming soon.</p>
        </div>
      </div>
    </div>
  );

  const renderAboutPage = () => (
    <div className="flex min-h-screen bg-zinc-50 text-zinc-900">
      {renderMobileNav("about")}
      <Sidebar activeView="about" onNavigate={(nextView) => setView(nextView)} />
      <div className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[30px] border border-zinc-200 bg-white p-6 shadow-[0_12px_30px_rgba(24,24,27,0.05)] sm:p-8">
          <h1 className="text-3xl font-semibold tracking-[-0.06em] text-zinc-900">ResumeLens AI</h1>
          <p className="mt-4 text-lg leading-8 text-zinc-600">
            An AI-powered resume and job description analysis tool.
          </p>

          <div className="mt-8 space-y-6 text-zinc-700">
            <p>Upload your resume and paste the job description to compare them side by side.</p>
            <p>The AI analyzes both documents, identifies relevant skills, and highlights strengths and gaps.</p>
            <p>It then generates recommendations to help you align your experience more closely with the role.</p>
            <p>The final analysis is validated before it is presented to you.</p>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold tracking-[-0.04em] text-zinc-900">How it works</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {[
                "Upload your resume",
                "Paste the job description",
                "AI analyzes both",
                "Skills are compared",
                "Strengths and gaps are identified",
                "Recommendations are generated",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold tracking-[-0.04em] text-zinc-900">Technologies</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "FastAPI",
                "LangChain",
                "LangGraph",
                "Gemini",
                "Tool Calling",
                "Structured Output",
                "AI Validation",
              ].map((item) => (
                <span key={item} className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {view === "landing" && renderLandingPage()}
      {view === "analyze" && renderAnalyzerPage()}
      {view === "history" && renderHistoryPage()}
      {view === "about" && renderAboutPage()}
    </div>
  );
}
