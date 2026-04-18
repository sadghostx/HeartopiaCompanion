"use client";

import ChecklistStars from "./ChecklistStars";

interface Props {
  item: any;
  category: string;
  fields: { key: string; label: string }[];
}

export default function DataCard({ item, category, fields }: Props) {
  return (
    <div className="card">
      <div className="card-header">{item.name}</div>

      {fields.map((field) => (
        <div key={field.key} className="card-section">
          <strong>{field.label}:</strong> {item[field.key]}
        </div>
      ))}

      <div className="card-section">
        <ChecklistStars itemName={item.name} category={category} />
      </div>
    </div>
  );
}