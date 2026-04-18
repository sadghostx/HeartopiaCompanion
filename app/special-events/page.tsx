"use client";

import { useEffect, useState } from "react";
import SectionHeader from "@/app/components/SectionHeader";
import FilterChips from "@/app/components/FilterChips";
import DataTable from "@/app/components/DataTable";
import DataCard from "@/app/components/DataCard";
import LoadingSpinner from "@/components/LoadingSpinner";

import { Creature } from "@/types/Creature";

export default function SpecialEventsPage() {
  const [allCreatures, setAllCreatures] = useState<Creature[]>([]);
  const [filtered, setFiltered] = useState<Creature[]>([]);
  const [loading, setLoading] = useState(true);

  const [weather, setWeather] = useState<string[]>([]);
  const [times, setTimes] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  const mobile = isMobile();

  useEffect(() => {
    const load = async () => {
      const all = await getAllData();

      const combined = [
        ...all.fish,
        ...all.insects,
        ...all.birds,
      ];

      setAllCreatures(combined);
      setFiltered(combined);
      setLoading(false);
    };

    load();
  }, []);

  useEffect(() => {
    let result = [...allCreatures];

    result = filterByWeather(result, weather);
    result = filterByTime(result, times);
    result = filterByLocation(result, locations);

    setFiltered(result);
  }, [weather, times, locations, allCreatures]);

  if (loading) return <LoadingSpinner />;

  const weatherOptions = ["Sunny", "Rain", "Snow", "Cloudy", "Rainbow"];
  const timeOptions = ["Morning", "Day", "Evening", "Night"];
  const locationOptions = [
    "Forest",
    "Suburbs",
    "Onsen Mountain",
    "Whale Sea",
    "Flower Field",
  ];

  const columns = [
    { key: "name", label: "Name" },
    { key: "category", label: "Type" },
    { key: "location", label: "Location" },
    { key: "weather", label: "Weather" },
    { key: "timeOfDay", label: "Time" },
  ];

  return (
    <AuthGuard>
      <SectionHeader title="Special Events" />

      <h3>Weather</h3>
      <FilterChips
        options={weatherOptions}
        active={weather}
        onToggle={(v) =>
          setWeather((prev) =>
            prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
          )
        }
      />

      <h3>Time of Day</h3>
      <FilterChips
        options={timeOptions}
        active={times}
        onToggle={(v) =>
          setTimes((prev) =>
            prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
          )
        }
      />

      <h3>Location</h3>
      <FilterChips
        options={locationOptions}
        active={locations}
        onToggle={(v) =>
          setLocations((prev) =>
            prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
          )
        }
      />

      <div style={{ marginTop: "20px" }}>
        {mobile ? (
          filtered.map((item) => (
            <DataCard
              key={item.name}
              item={item}
              category={item.category}
              fields={columns}
            />
          ))
        ) : (
          <DataTable
            data={filtered}
            columns={columns}
            category="special-events"
          />
        )}
      </div>
    </AuthGuard>
  );
}