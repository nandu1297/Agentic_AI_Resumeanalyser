import type { FinalReport } from "./types";

interface AnalysisResultProps {
  report: FinalReport;
}

function SkillList({ title, items, emptyMessage }: { title: string; items: string[]; emptyMessage: string }) {
  return (
    <section className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_12px_30px_rgba(24,24,27,0.05)] sm:p-6">
      <h3 className="mb-4 text-lg font-semibold tracking-[-0.04em] text-zinc-900">{title}</h3>
      {items.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-700"
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-zinc-500">{emptyMessage}</p>
      )}
    </section>
  );
}

export function AnalysisResult({ report }: AnalysisResultProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_12px_30px_rgba(24,24,27,0.05)] sm:p-6">
        <h2 className="text-2xl font-semibold tracking-[-0.05em] text-zinc-900">Overall Analysis</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <span
            className={[
              "rounded-full px-4 py-2 text-sm font-medium",
              report.experience_match
                ? "bg-emerald-100 text-emerald-800"
                : "bg-amber-100 text-amber-800",
            ].join(" ")}
          >
            {report.experience_match ? "Experience requirement met" : "Experience requirement not met"}
          </span>
        </div>
      </section>

      <SkillList title="Matching Skills" items={report.matching_skills} emptyMessage="No matching skills returned by the analysis." />
      <SkillList title="Missing Skills" items={report.missing_skills} emptyMessage="No missing skills reported." />

      <section className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_12px_30px_rgba(24,24,27,0.05)] sm:p-6">
        <h3 className="mb-4 text-lg font-semibold tracking-[-0.04em] text-zinc-900">Strengths</h3>
        {report.strengths.length > 0 ? (
          <ul className="space-y-3">
            {report.strengths.map((item) => (
              <li key={item} className="flex gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-zinc-500">No strengths reported.</p>
        )}
      </section>

      <section className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_12px_30px_rgba(24,24,27,0.05)] sm:p-6">
        <h3 className="mb-4 text-lg font-semibold tracking-[-0.04em] text-zinc-900">Gaps</h3>
        {report.gaps.length > 0 ? (
          <ul className="space-y-3">
            {report.gaps.map((item) => (
              <li key={item} className="flex gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-zinc-500">No gaps reported.</p>
        )}
      </section>

      <section className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_12px_30px_rgba(24,24,27,0.05)] sm:p-6">
        <h3 className="mb-4 text-lg font-semibold tracking-[-0.04em] text-zinc-900">Recommendations</h3>
        {report.recommendations.length > 0 ? (
          <ol className="space-y-3">
            {report.recommendations.map((item, index) => (
              <li key={item} className="flex gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-medium text-white">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-zinc-500">No recommendations returned.</p>
        )}
      </section>
    </div>
  );
}
