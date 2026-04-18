"use client";


interface Props {
  options: string[];
  active: string[];
  onToggle: (value: string) => void;
}

export default function FilterChips({ options, active, onToggle }: Props) {
  return (
    <div>
      {options.map((opt) => (
        <span
          key={opt}
          className={`filter-chip ${active.includes(opt) ? "active" : ""}`}
          onClick={() => onToggle(opt)}
        >
          {opt}
        </span>
      ))}
    </div>
  );
}