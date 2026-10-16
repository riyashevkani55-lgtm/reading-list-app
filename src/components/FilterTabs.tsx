import type { StatusFilter } from "@/types";

interface FilterTabsProps {
  active: StatusFilter;
  counts: Record<StatusFilter, number>;
  onChange: (filter: StatusFilter) => void;
}

const FILTERS: StatusFilter[] = ["All", "Want to Read", "Reading", "Finished"];

export default function FilterTabs({
  active,
  counts,
  onChange,
}: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
            active === f
              ? "bg-stone-800 text-white"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
          }`}
        >
          {f}
          <span
            className={`rounded-full px-1.5 text-xs ${
              active === f
                ? "bg-white/20 text-white"
                : "bg-stone-200 text-stone-500"
            }`}
          >
            {counts[f] ?? 0}
          </span>
        </button>
      ))}
    </div>
  );
}
