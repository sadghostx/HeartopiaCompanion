"use client";

import { useState } from "react";

interface Props {
  itemName: string;
  category: string;
}

export default function ChecklistStars({ itemName, category }: Props) {
  const [level, setLevel] = useState(0);

  const handleSelect = async (newLevel: number) => {
    setLevel(newLevel);

    // TODO: Add Firestore save here if needed
    // await saveChecklist(uid, category, { [itemName]: newLevel });
  };

  return (
    <div style={{ display: "flex", gap: "2px", cursor: "pointer" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleSelect(star)}
          style={{
            color: star <= level ? "#FFD700" : "#ccc",
            fontSize: "1.1rem",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}