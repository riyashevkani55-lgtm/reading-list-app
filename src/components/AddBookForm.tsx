import { useState } from "react";
import { Plus } from "lucide-react";
import type { ReadingStatus } from "@/types";
import { STATUS_ORDER } from "@/types";

interface AddBookFormProps {
  onAdd: (title: string, status: ReadingStatus) => void;
  existingTitles: string[];
}

const MAX_TITLE_LENGTH = 60;

export default function AddBookForm({
  onAdd,
  existingTitles,
}: AddBookFormProps) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<ReadingStatus>("Want to Read");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError("Please enter a book title.");
      return;
    }
    if (trimmed.length > MAX_TITLE_LENGTH) {
      setError("Book title must be 60 characters or fewer.");
      return;
    }
    const normalized = trimmed.toLowerCase().replace(/\s+/g, " ");
    const isDuplicate = existingTitles.some(
      (t) => t.trim().toLowerCase().replace(/\s+/g, " ") === normalized,
    );
    if (isDuplicate) {
      setError("This book is already in your reading list.");
      return;
    }
    onAdd(trimmed, status);
    setTitle("");
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-stone-500">
        Add a Book
      </h2>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex-1">
          <label htmlFor="book-title" className="sr-only">
            Book title
          </label>
          <input
            id="book-title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError("");
            }}
            placeholder="e.g. The Great Gatsby"
            maxLength={MAX_TITLE_LENGTH}
            className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-2.5 text-stone-900 placeholder-stone-400 transition focus:border-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-200"
          />
          {error && (
            <p className="mt-1.5 text-sm text-red-600">{error}</p>
          )}
        </div>

        <div className="flex gap-2 sm:flex-col">
          {STATUS_ORDER.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={`flex-1 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition sm:flex-none ${
                status === s
                  ? "bg-stone-800 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-stone-800 px-5 py-2.5 font-medium text-white transition hover:bg-stone-900 active:scale-[0.99] sm:w-auto"
      >
        <Plus size={18} />
        Add to List
      </button>
    </form>
  );
}
