"use client";

import { useState, useEffect } from "react";
import { fashionwaveData } from "../../lib/data/fashionwave";
import { getChecklist, saveChecklist } from "../../lib/data";
import { useAuth } from "../../lib/auth";

const weatherIcons: Record<string, string> = {
  sun: "🌞",
  rain: "🌧️",
  wind: "🌬️",
  rainbow: "🌈",
  meteor: "☄️",
};

const timeIcons: Record<string, string> = {
  night: "🌙",
  morning: "🌅",
  day: "🌞",
  evening: "🌆",
};

export default function FashionwaveContent() {
  const [caughtStars, setCaughtStars] = useState<Record<string, number>>({});
  const [search, setSearch] = useState("");
  const [weatherFilter, setWeatherFilter] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<null | string>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      getChecklist(user.uid).then((checklist) => {
        setCaughtStars(checklist.fashionwave || {});
      });
    }
  }, [user]);

  const handleStarSelect = async (name: string, value: number) => {
    const newCaughtStars = { ...caughtStars, [name]: value };
    setCaughtStars(newCaughtStars);
    if (user) {
      const checklist = await getChecklist(user.uid);
      checklist.fashionwave = newCaughtStars;
      await saveChecklist(user.uid, checklist);
    }
  };

  // FILTERING
  let filtered = fashionwaveData.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());

    const matchesWeather =
      !weatherFilter || item.weather.includes(weatherFilter);

    const matchesTime =
      !timeFilter || item.time.includes(timeFilter);

    return matchesSearch && matchesWeather && matchesTime;
  });

  // SORTING
  if (sortColumn) {
    filtered = [...filtered].sort((a, b) => {
      let valA: any = a[sortColumn as keyof typeof a];
      let valB: any = b[sortColumn as keyof typeof b];

      if (sortColumn === "stars") {
        const avgA =
          Object.values(a.stars).filter(n => n !== null).reduce((x, y) => x + (y as number), 0) /
          Object.values(a.stars).filter(n => n !== null).length;

        const avgB =
          Object.values(b.stars).filter(n => n !== null).reduce((x, y) => x + (y as number), 0) /
          Object.values(b.stars).filter(n => n !== null).length;

        valA = avgA || 0;
        valB = avgB || 0;
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
        placeholder="Search fashionwave items..."
        className="w-full p-2 mb-4 border rounded-md"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* FILTERS */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {Object.keys(weatherIcons).map(w => (
          <button
            key={w}
            className={`filter-chip ${weatherFilter === w ? "active" : ""}`}
            onClick={() => setWeatherFilter(weatherFilter === w ? null : w)}
          >
            {weatherIcons[w]} {w}
          </button>
        ))}

        {Object.keys(timeIcons).map(t => (
          <button
            key={t}
            className={`filter-chip ${timeFilter === t ? "active" : ""}`}
            onClick={() => setTimeFilter(timeFilter === t ? null : t)}
          >
            {timeIcons[t]} {t}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="heartopia-table-container">
        <table className="heartopia-table">
          <thead>
            <tr>
              <th className="heartopia-sticky-col" onClick={() => toggleSort("name")}>Name</th>
              <th onClick={() => toggleSort("location")}>Location</th>
              <th>Weather</th>
              <th>Time</th>
              <th onClick={() => toggleSort("stars")}>⭐</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(item => (
              <tr key={item.name}>
                <td className="heartopia-sticky-col">{item.name}</td>
                <td>{item.location}</td>

                <td>
                  {item.weather.map(w => (
                    <span key={w}>{weatherIcons[w]} </span>
                  ))}
                </td>

                <td>
                  {item.time.map(t => (
                    <span key={t}>{timeIcons[t]} </span>
                  ))}
                </td>

                {/* ⭐ Combined Stars + Prices Column */}
                <td className="p-3 text-center">
                  <div className="flex justify-center gap-3">
                    {[1, 2, 3, 4, 5].map(star => (
                      <div key={star} className="flex flex-col items-center">
                        <button
                          onClick={() => handleStarSelect(item.name, star)}
                          className={`px-2 py-1 rounded text-sm ${
                            caughtStars[item.name] === star
                              ? "bg-yellow-300 text-black font-semibold"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {star}⭐
                        </button>

                        <span className="text-xs text-gray-500 mt-1">
                          {item.stars[star] ?? "-"}
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