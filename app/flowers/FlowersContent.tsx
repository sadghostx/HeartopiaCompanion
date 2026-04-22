"use client";

import { useState, useEffect } from "react";
import { flowersData } from "../../lib/data/flowers";
import { getChecklist, saveChecklist } from "../../lib/data";
import { useAuth } from "../../lib/auth";

// Heart icons for each color
const hearts: Record<string, string> = {
  red: "❤️",
  white: "🤍",
  yellow: "💛",
  orange: "🧡",
  pink: "💗",
  black: "🖤",
  peach: "🩷",
  purple: "💜",
  selene: "💙"
};

export default function FlowersContent() {
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const { user } = useAuth();

  // Track selected colors
  const [selected, setSelected] = useState<
    Record<string, Record<string, boolean>>
  >({});

  useEffect(() => {
    if (user) {
      getChecklist(user.uid).then((checklist) => {
        setSelected(checklist.flowers || {});
      });
    }
  }, [user]);

  const toggle = async (flowerName: string, colorKey: string) => {
    const newSelected = {
      ...selected,
      [flowerName]: {
        ...(selected[flowerName] || {}),
        [colorKey]: !selected[flowerName]?.[colorKey]
      }
    };
    setSelected(newSelected);
    if (user) {
      const checklist = await getChecklist(user.uid);
      checklist.flowers = newSelected;
      await saveChecklist(user.uid, checklist);
    }
  };

  // Break colors into rows of 3
  const chunkColors = (colors: any[]) => {
    const chunks = [];
    for (let i = 0; i < colors.length; i += 3) {
      chunks.push(colors.slice(i, i + 3));
    }
    return chunks;
  };

  // FILTER
  let filtered = flowersData.filter(f => {
    const s = search.toLowerCase();
    return (
      f.name.toLowerCase().includes(s) ||
      f.key.toLowerCase().includes(s) ||
      f.emoji.includes(s)
    );
  });

  // SORT
  if (sortColumn) {
    filtered = [...filtered].sort((a, b) => {
      let A: any = (a as any)[sortColumn];
      let B: any = (b as any)[sortColumn];

      if (typeof A === "string") A = A.toLowerCase();
      if (typeof B === "string") B = B.toLowerCase();

      if (A < B) return sortAsc ? -1 : 1;
      if (A > B) return sortAsc ? 1 : -1;
      return 0;
    });
  }

  const toggleSort = (col: string) => {
    if (sortColumn === col) setSortAsc(!sortAsc);
    else {
      setSortColumn(col);
      setSortAsc(true);
    }
  };

  return (
    <div className="p-4">
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search flowers..."
        className="w-full p-2 mb-4 border rounded-md"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div className="heartopia-table-container">
        <table className="heartopia-table">
          <thead>
            <tr>
              <th className="heartopia-sticky-col" onClick={() => toggleSort("name")}>
                Name
              </th>
              <th onClick={() => toggleSort("growthTime")}>Growth Time</th>
              <th onClick={() => toggleSort("gardeningLevel")}>Level</th>
              <th onClick={() => toggleSort("seedPurchase")}>Seed Price</th>
              <th onClick={() => toggleSort("seedSell")}>Seed Sell</th>
              <th>Colors</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(flower => (
              <>
                {/* MAIN FLOWER ROW */}
                <tr key={flower.name}>
                  <td className="heartopia-sticky-col">
                    <span className="mr-1">{flower.emoji}</span>
                    {flower.name}
                  </td>
                  <td>{flower.growthTime ?? "-"}</td>
                  <td>{flower.gardeningLevel ?? "-"}</td>
                  <td>{flower.seedPurchase ?? "-"}</td>
                  <td>{flower.seedSell ?? "-"}</td>
                  <td></td>
                </tr>

                {/* COLOR GRID ROW */}
                <tr>
                  <td colSpan={6} className="p-4 bg-gray-50">
                    <div className="flex flex-col gap-4">
                      {chunkColors(flower.colors).map((row, i) => (
                        <div key={i} className="grid grid-cols-3 gap-6">
                          {row.map(color => {
                            const price = flower.stars[color.starTier];

                            return (
                              <div
                                key={color.colorKey}
                                className="p-3 border rounded-lg bg-white shadow-sm"
                              >
                                {/* Color Name + Heart */}
                                <div className="font-semibold mb-2 flex items-center gap-2">
                                  <span>{hearts[color.colorKey]}</span>
                                  <span>{color.colorName}</span>
                                </div>

                                {/* Star Tier + Price */}
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() =>
                                      toggle(flower.name, color.colorKey)
                                    }
                                    className={`px-2 py-1 rounded text-sm ${
                                      selected[flower.name]?.[color.colorKey]
                                        ? "bg-yellow-300 text-black font-semibold"
                                        : "bg-gray-200 text-gray-700"
                                    }`}
                                  >
                                    {color.starTier}⭐
                                  </button>

                                  <span className="text-gray-700">
                                    {price ?? "-"}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}