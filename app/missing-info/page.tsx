"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import SectionHeader from "@/app/components/SectionHeader";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function MissingInfoPage() {
  const [missing, setMissing] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const all = await getAllData();
      const combined = [
        ...all.fish,
        ...all.insects,
        ...all.birds,
        ...all.crops,
        ...all.recipes,
        ...all.flowers,
      ];

      const incomplete = combined.filter((item) =>
        Object.values(item).some((v) => v === "" || v === undefined)
      );

      setMissing(incomplete);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <AuthGuard>
      <SectionHeader title="Missing Info" />

      {missing.map((item) => (
        <div key={item.name} style={{ marginBottom: "20px" }}>
          <strong>{item.name}</strong>
          <pre>{JSON.stringify(item, null, 2)}</pre>
        </div>
      ))}
    </AuthGuard>
  );
}