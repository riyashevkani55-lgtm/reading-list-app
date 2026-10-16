import { useMemo, useState } from "react";
import { BookOpen } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import AddBookForm from "@/components/AddBookForm";
import BookCard from "@/components/BookCard";
import FilterTabs from "@/components/FilterTabs";
import type { Book, ReadingStatus, StatusFilter } from "@/types";

export default function App() {
  const [books, setBooks] = useLocalStorage<Book[]>("reading-list-books", []);
  const [filter, setFilter] = useState<StatusFilter>("All");

  const handleAdd = (title: string, status: ReadingStatus) => {
    setBooks((prev) => [
      { id: crypto.randomUUID(), title, status, createdAt: Date.now() },
      ...prev,
    ]);
  };

  const handleStatusChange = (id: string, status: ReadingStatus) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b)),
    );
  };

  const handleDelete = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const counts = useMemo(() => {
    const base: Record<StatusFilter, number> = {
      All: books.length,
      "Want to Read": 0,
      Reading: 0,
      Finished: 0,
    };
    for (const b of books) base[b.status]++;
    return base;
  }, [books]);

  const visibleBooks = useMemo(() => {
    if (filter === "All") return books;
    return books.filter((b) => b.status === filter);
  }, [books, filter]);

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone-800 text-white">
              <BookOpen size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-stone-900">
                Reading List
              </h1>
              <p className="text-sm text-stone-500">
                Track your books and reading progress
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        <AddBookForm
          onAdd={handleAdd}
          existingTitles={books.map((b) => b.title)}
        />

        {books.length > 0 && (
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-stone-900">
                {books.length}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-stone-500">
                Total Books
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-sky-600">
                {counts.Reading}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-stone-500">
                Currently Reading
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-emerald-600">
                {counts.Finished}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-stone-500">
                Finished
              </p>
            </div>
          </div>
        )}

        {books.length > 0 && (
          <div className="mt-6">
            <FilterTabs
              active={filter}
              counts={counts}
              onChange={setFilter}
            />
          </div>
        )}

        {/* Book grid / empty state */}
        <div className="mt-6">
          {books.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-stone-300 bg-white/50 px-6 py-20 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-stone-200">
                <BookOpen size={28} className="text-stone-400" />
              </div>
              <p className="text-lg font-medium text-stone-600">
                Your reading list is empty. Add your first book.
              </p>
            </div>
          ) : visibleBooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-stone-200 bg-white px-6 py-16 text-center">
              <p className="text-stone-500">
                No books in this category yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {visibleBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer hint */}
        {books.length > 0 && (
          <p className="mt-8 text-center text-sm text-stone-400">
            Your list is saved automatically in this browser.
          </p>
        )}
      </main>
    </div>
  );
}
