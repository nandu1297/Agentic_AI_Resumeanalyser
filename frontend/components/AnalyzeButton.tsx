interface AnalyzeButtonProps {
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
}

export function AnalyzeButton({ disabled, loading, onClick }: AnalyzeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-base font-semibold shadow-[0_14px_30px_rgba(24,24,27,0.12)] transition-all duration-200",
        disabled
          ? "cursor-not-allowed bg-zinc-300 text-zinc-500 shadow-none"
          : "bg-zinc-900 text-white hover:bg-zinc-800",
      ].join(" ")}
    >
      {loading ? (
        <span className="inline-flex items-center gap-3">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          Analyzing...
        </span>
      ) : (
        "Analyze Resume"
      )}
    </button>
  );
}
