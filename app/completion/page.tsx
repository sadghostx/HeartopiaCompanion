"use client";

import { useEffect, useState } from "react";
import SectionHeader from "@/app/components/SectionHeader";
import PastelProgressBar from "@/app/components/PastelProgressBar";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function CompletionPage() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const all = await getAllData();

      const categories = ["fish", "insects", "birds", "crops", "cooking", "flowers"];

      const results: any = {};

      for (const cat of categories) {
        const checklist = await getChecklist(user.uid, cat);
        const items = (all as any)[cat];

        const totalStars = items.length * 5;
        let earnedStars = 0;

        items.forEach((item: any) => {
          const stars = checklist[item.name] || {};
          earnedStars += Object.values(stars).filter(Boolean).length;
        });

        results[cat] = {
          totalStars,
          earnedStars,
          percent: Math.round((earnedStars / totalStars) * 100),
        };
      }

      setProgress(results);
      setLoading(false);
    };

    load();
  }, [user]);

  if (loading) return <LoadingSpinner />;

  return (
    <AuthGuard>
      <SectionHeader title="Completion" />

      {Object.entries(progress).map(([cat, info]: any) => (
        <div key={cat} style={{ marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "6px" }}>{cat.toUpperCase()}</h3>
          <PastelProgressBar percent={info.percent} />
        </div>
      ))}
    </AuthGuard>
  );
}