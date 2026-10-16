export type ReadingStatus = "Want to Read" | "Reading" | "Finished";

export type StatusFilter = "All" | ReadingStatus;

export interface Book {
  id: string;
  title: string;
  status: ReadingStatus;
  createdAt: number;
}

export const STATUS_ORDER: ReadingStatus[] = [
  "Want to Read",
  "Reading",
  "Finished",
];

export const STATUS_STYLES: Record<
  ReadingStatus,
  { badge: string; dot: string; ring: string }
> = {
  "Want to Read": {
    badge: "bg-amber-100 text-amber-800",
    dot: "bg-amber-500",
    ring: "hover:ring-amber-300",
  },
  Reading: {
    badge: "bg-sky-100 text-sky-800",
    dot: "bg-sky-500",
    ring: "hover:ring-sky-300",
  },
  Finished: {
    badge: "bg-emerald-100 text-emerald-800",
    dot: "bg-emerald-500",
    ring: "hover:ring-emerald-300",
  },
};
