interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function JobDescriptionInput({ value, onChange }: JobDescriptionInputProps) {
  return (
    <div className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_12px_30px_rgba(24,24,27,0.05)] sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-[-0.04em] text-zinc-900">
          Job Description
        </h2>
      </div>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Paste the job description here..."
        className="min-h-64 w-full resize-none rounded-[22px] border border-zinc-200 bg-zinc-50 px-4 py-3 text-base text-zinc-800 outline-none transition focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-200"
      />

      <div className="mt-3 flex justify-end text-xs text-zinc-500">
        {value.length} characters
      </div>
    </div>
  );
}
