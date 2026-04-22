"use client";

import { useState, useEffect } from "react";
import { cookingData } from "../../lib/data/cooking";
import { getChecklist, saveChecklist } from "../../lib/data";
import { useAuth } from "../../lib/auth";

export default function CookingContent() {
  const [selectedStars, setSelectedStars] = useState<Record<string, number>>({});
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      getChecklist(user.uid).then((checklist) => {
        setSelectedStars(checklist.cooking || {});
      });
    }
  }, [user]);

  const handleStarSelect = async (name: string, value: number) => {
    const newSelectedStars = { ...selectedStars, [name]: value };
    setSelectedStars(newSelectedStars);
    if (user) {
      const checklist = await getChecklist(user.uid);
      checklist.cooking = newSelectedStars;
      await saveChecklist(user.uid, checklist);
    }
  };

  // FILTERING
  let filtered = cookingData.filter(recipe => {
    const s = search.toLowerCase();

    const matchesName = recipe.name.toLowerCase().includes(s);

    const matchesIngredients = recipe.ingredients.some(i =>
      (i.emoji ?? "").toLowerCase().includes(s) ||
      (i.key ?? "").toLowerCase().includes(s) ||
      (i.raw ?? "").toLowerCase().includes(s)
    );

    return matchesName || matchesIngredients;
  });

  // SORTING
  if (sortColumn) {
    filtered = [...filtered].sort((a, b) => {
      let valA: any = (a as any)[sortColumn];
      let valB: any = (b as any)[sortColumn];

      // Sorting by stars → use average price
      if (sortColumn === "stars") {
        const avg = (obj: any) => {
          const prices = Object.values(obj)
            .map((s: any) => s.price)
            .filter((p: any) => p !== null);

          if (prices.length === 0) return 0;
          return prices.reduce((x: number, y: number) => x + y, 0) / prices.length;
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
        placeholder="Search recipes..."
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
              <th>Ingredients</th>
              <th onClick={() => toggleSort("cookingLevel")}>Level</th>
              <th onClick={() => toggleSort("recipePrice")}>Recipe Price</th>
              <th onClick={() => toggleSort("stars")}>⭐</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(recipe => (
              <tr key={recipe.name}>
                {/* NAME */}
                <td className="heartopia-sticky-col">{recipe.name}</td>

                {/* INGREDIENTS */}
                <td className="text-sm text-gray-700">
                  <div className="flex flex-wrap gap-1">
                    {recipe.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-100 rounded text-xs flex items-center gap-1"
                      >
                        {ing.emoji && <span>{ing.emoji}</span>}
                        <span className="text-gray-600">{ing.key}</span>
                      </span>
                    ))}
                  </div>
                </td>

                {/* LEVEL */}
                <td>{recipe.cookingLevel ?? "-"}</td>

                {/* RECIPE PRICE */}
                <td>{recipe.recipePrice ?? "-"}</td>

                {/* ⭐ STAR / PRICE / ENERGY / PROFIT */}
                <td className="p-3 text-center">
                  <div className="flex justify-center gap-4">
                    {[1, 2, 3, 4, 5].map(star => {
                      const data = recipe.stars[star];

                      return (
                        <div key={star} className="flex flex-col items-center text-xs">
                          {/* STAR BUTTON */}
                          <button
                            onClick={() => handleStarSelect(recipe.name, star)}
                            className={`px-2 py-1 rounded text-sm mb-1 ${
                              selectedStars[recipe.name] === star
                                ? "bg-yellow-300 text-black font-semibold"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {star}⭐
                          </button>

                          {/* PRICE */}
                          <span className="text-gray-700">
                            <strong>Price:</strong> {data.price ?? "-"}
                          </span>

                          {/* ENERGY */}
                          <span className="text-green-700">
                            <strong>Energy:</strong>{" "}
                            {data.energy !== null ? `+${data.energy}` : "-"}
                          </span>

                          {/* PROFIT */}
                          <span className="text-blue-700">
                            <strong>Profit:</strong>{" "}
                            {data.profit !== null ? `+${data.profit}` : "-"}
                          </span>
                        </div>
                      );
                    })}
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