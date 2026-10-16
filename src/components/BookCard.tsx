import { useState } from "react";
import { Check, ChevronDown, Trash2 } from "lucide-react";
import type { Book, ReadingStatus } from "@/types";
import { STATUS_ORDER, STATUS_STYLES } from "@/types";

interface BookCardProps {
  book: Book;
  onStatusChange: (id: string, status: ReadingStatus) => void;
  onDelete: (id: string) => void;
}

export default function BookCard({
  book,
  onStatusChange,
  onDelete,
}: BookCardProps) {
  const [open, setOpen] = useState(false);
  const styles = STATUS_STYLES[book.status];

  return (
    <div
      className={`group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm ring-2 ring-transparent transition ${styles.ring} hover:shadow-md`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold leading-snug text-stone-900">
            {book.title}
          </h3>
          <div className="mt-2.5 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${styles.badge}`}
            >
              <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
              {book.status}
            </span>
          </div>
        </div>

        <button
          onClick={() => onDelete(book.id)}
          aria-label={`Delete ${book.title}`}
          className="shrink-0 rounded-lg p-2 text-stone-300 transition hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Status dropdown */}
      <div className="relative mt-4">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-600 transition hover:border-stone-300 hover:bg-white"
        >
          Change status
          <ChevronDown
            size={16}
            className={`transition ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="absolute bottom-full left-0 z-10 mb-1 w-full overflow-hidden rounded-xl border border-stone-200 bg-white py-1 shadow-lg">
            {STATUS_ORDER.map((s) => (
              <button
                key={s}
                onClick={() => {
                  onStatusChange(book.id, s);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between px-3 py-2 text-left text-sm transition hover:bg-stone-50"
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${STATUS_STYLES[s].dot}`}
                  />
                  {s}
                </span>
                {book.status === s && (
                  <Check size={16} className="text-stone-400" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
