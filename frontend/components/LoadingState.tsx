const stages = [
  "Reading resume",
  "Understanding job description",
  "Comparing skills",
  "Generating insights",
  "Validating analysis",
];

export function LoadingState() {
  return (
    <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_12px_30px_rgba(24,24,27,0.05)] sm:p-8">
      <div className="mb-6">
        <p className="text-2xl font-semibold tracking-[-0.05em] text-zinc-900">
          Analyzing your resume...
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          Our AI is comparing your profile with the role requirements.
        </p>
      </div>

      <div className="space-y-4">
        {stages.map((stage, index) => (
          <div key={stage} className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 bg-zinc-50 text-xs font-semibold text-zinc-700">
              {index + 1}
            </div>
            <div className="flex-1 overflow-hidden rounded-full bg-zinc-100">
              <div
                className="h-2 rounded-full bg-zinc-900 transition-all duration-500"
                style={{ width: `${((index + 1) / stages.length) * 100}%` }}
              />
            </div>
            <span className="min-w-0 flex-1 text-sm text-zinc-600">{stage}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
