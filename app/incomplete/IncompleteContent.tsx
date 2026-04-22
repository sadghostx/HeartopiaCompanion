"use client";

import { useState, useEffect } from "react";
import { getAllData, getChecklist } from "../../lib/data";
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

interface Item {
  name: string;
  location: string;
  weather: string[];
  time: string[];
  stars: { [key: number]: number };
  category: string;
}

export default function IncompleteContent() {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [checklist, setChecklist] = useState<any>({});
  const [search, setSearch] = useState("");
  const [weatherFilter, setWeatherFilter] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      const data = await getAllData();
      const items: Item[] = [];
      for (const [category, categoryData] of Object.entries(data)) {
        for (const item of categoryData as any[]) {
          items.push({ ...item, category });
        }
      }
      setAllItems(items);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (user) {
      getChecklist(user.uid).then(setChecklist);
    }
  }, [user]);

  // Get incomplete items
  const incompleteItems = allItems.filter(item => {
    const categoryChecklist = checklist[item.category] || {};
    return !categoryChecklist[item.name];
  });

  // FILTERING
  let filtered = incompleteItems.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());

    const matchesWeather =
      !weatherFilter || item.weather.includes(weatherFilter);

    const matchesTime =
      !timeFilter || item.time.includes(timeFilter);

    const matchesCategory =
      !categoryFilter || item.category === categoryFilter;

    return matchesSearch && matchesWeather && matchesTime && matchesCategory;
  });

  const categories = [...new Set(allItems.map(item => item.category))];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Incomplete Items</h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search incomplete items..."
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

        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-chip ${categoryFilter === cat ? "active" : ""}`}
            onClick={() => setCategoryFilter(categoryFilter === cat ? null : cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="heartopia-table-container">
        <table className="heartopia-table">
          <thead>
            <tr>
              <th className="heartopia-sticky-col">Name</th>
              <th>Category</th>
              <th>Location</th>
              <th>Weather</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(item => (
              <tr key={`${item.category}-${item.name}`}>
                <td className="heartopia-sticky-col">{item.name}</td>
                <td>{item.category}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}