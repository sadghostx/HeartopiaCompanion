"use client";

import { useState } from "react";
import { cropsData } from "../../lib/data/crops";

export default function CropsContent() {
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const [selectedStars, setSelectedStars] = useState<Record<string, number>>({});

  const handleStarSelect = (cropName: string, star: number) => {
    setSelectedStars(prev => ({ ...prev, [cropName]: star }));
  };

  // FILTERING
  let filtered = cropsData.filter(crop => {
    const s = search.toLowerCase();
    return (
      crop.name.toLowerCase().includes(s) ||
      crop.key.toLowerCase().includes(s) ||
      crop.emoji.includes(s)
    );
  });

  // SORTING
  if (sortColumn) {
    filtered = [...filtered].sort((a, b) => {
      let valA: any = (a as any)[sortColumn];
      let valB: any = (b as any)[sortColumn];

      if (sortColumn === "stars") {
        const avg = (obj: any) => {
        const values = Object.values(obj).filter((v): v is number => v !== null);          if (values.length === 0) return 0;
          return values.reduce((x: number, y: number) => x + y, 0) / values.length;
        };
        valA = avg(a.stars);
        valB = avg(b.stars);
      }

      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();

      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
  }

  const toggleSort = (column: string) => {
    if (sortColumn === column) {
      setSortAsc(!sortAsc);
    } else {
      setSortColumn(column);
      setSortAsc(true);
    }
  };

  return (
    <div className="p-4">
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search crops..."
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
              <th onClick={() => toggleSort("stars")}>⭐</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(crop => (
              <tr key={crop.name}>
                {/* NAME */}
                <td className="heartopia-sticky-col">
                  <span className="mr-1">{crop.emoji}</span>
                  {crop.name}
                </td>

                {/* GROWTH TIME */}
                <td>{crop.growthTime ?? "-"}</td>

                {/* LEVEL */}
                <td>{crop.gardeningLevel ?? "-"}</td>

                {/* SEED PURCHASE */}
                <td>{crop.seedPurchase ?? "-"}</td>

                {/* SEED SELL */}
                <td>{crop.seedSell ?? "-"}</td>

                {/* ⭐ STAR SELECTOR COLUMN */}
                <td className="p-3 text-center">
                  <div className="flex justify-center gap-4">
                    {[1, 2, 3, 4, 5].map(star => (
                      <div key={star} className="flex flex-col items-center text-xs">
                        {/* STAR BUTTON */}
                        <button
                          onClick={() => handleStarSelect(crop.name, star)}
                          className={`px-2 py-1 rounded text-sm mb-1 ${
                            selectedStars[crop.name] === star
                              ? "bg-yellow-300 text-black font-semibold"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {star}⭐
                        </button>

                        {/* PRICE */}
                        <span className="text-gray-700">
                          {crop.stars[star] ?? "-"}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}