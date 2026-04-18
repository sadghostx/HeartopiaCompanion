"use client";

import ChecklistStars from "./ChecklistStars";

interface Column {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
}

interface Props {
  data: any[];
  columns: Column[];
  category: string;
}

export default function DataTable({ data, columns, category }: Props) {
  // Helper: supports nested keys like "stars.5"
  const getValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, part) => acc?.[part], obj);
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            <th>⭐</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.name}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render
                    ? col.render(item)
                    : (() => {
                        const value = getValue(item, col.key);

                        // Prevent React from trying to render objects
                        if (typeof value === "object" && value !== null) {
                          return JSON.stringify(value);
                        }

                        return value;
                      })()}
                </td>
              ))}

              <td>
                <ChecklistStars itemName={item.name} category={category} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}