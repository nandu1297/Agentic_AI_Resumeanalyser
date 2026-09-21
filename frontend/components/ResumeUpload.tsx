import { useRef, useState, type ChangeEvent, type DragEvent } from "react";

interface ResumeUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const formatFileSize = (size: number) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

export function ResumeUpload({ file, onFileChange }: ResumeUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;

    if (selectedFile && selectedFile.type !== "application/pdf") {
      onFileChange(null);
      event.target.value = "";
      return;
    }

    onFileChange(selectedFile);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files?.[0] ?? null;

    if (droppedFile && droppedFile.type !== "application/pdf") {
      onFileChange(null);
      return;
    }

    onFileChange(droppedFile);
  };

  return (
    <div className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_12px_30px_rgba(24,24,27,0.05)] sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-[-0.04em] text-zinc-900">
            Upload your resume
          </h2>
        </div>
      </div>

      <label
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={[
          "group flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed px-6 py-8 text-center transition-all duration-200",
          isDragging
            ? "border-zinc-900 bg-zinc-100"
            : "border-zinc-300 bg-zinc-50 hover:border-zinc-500 hover:bg-zinc-100",
        ].join(" ")}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleSelect}
        />

        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-lg text-white shadow-sm">
          PDF
        </div>
        <p className="text-base font-medium text-zinc-900">Click to upload or drag and drop</p>
        <p className="mt-1 text-sm text-zinc-500">PDF files only</p>
      </label>

      {file ? (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-zinc-900">{file.name}</p>
            <p className="text-xs text-zinc-500">{formatFileSize(file.size)}</p>
          </div>

          <button
            type="button"
            onClick={() => onFileChange(null)}
            className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-100"
          >
            Remove
          </button>
        </div>
      ) : null}
    </div>
  );
}
