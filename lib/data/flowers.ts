export interface FlowerColor {
  colorName: string;
  colorKey: string;
  starTier: number; // 1–5
}

export interface Flower {
  name: string;
  emoji: string;
  key: string;

  growthTime: string | null;
  gardeningLevel: number | null;

  seedSell: number | null;
  seedPurchase: number | null;

  stars: {
    1: number | null;
    2: number | null;
    3: number | null;
    4: number | null;
    5: number | null;
  };

  colors: FlowerColor[];
}

const universalColors: FlowerColor[] = [
  { colorName: "Red", colorKey: "red", starTier: 1 },
  { colorName: "White", colorKey: "white", starTier: 1 },
  { colorName: "Yellow", colorKey: "yellow", starTier: 1 },

  { colorName: "Orange", colorKey: "orange", starTier: 2 },
  { colorName: "Pink", colorKey: "pink", starTier: 2 },

  { colorName: "Black", colorKey: "black", starTier: 3 },
  { colorName: "Peach", colorKey: "peach", starTier: 3 },

  { colorName: "Purple", colorKey: "purple", starTier: 4 },

  { colorName: "Selene", colorKey: "selene", starTier: 5 }
];

export const flowersData: Flower[] = [
  {
    name: "Daisy",
    emoji: "🌼",
    key: "daisy",
    growthTime: "18 hours",
    gardeningLevel: 3,
    seedSell: 15,
    seedPurchase: 30,
    stars: { 1: 100, 2: 150, 3: 200, 4: null, 5: null },
    colors: universalColors
  },

  {
    name: "Pansy",
    emoji: "🌸",
    key: "pansy",
    growthTime: "18 hours",
    gardeningLevel: 4,
    seedSell: 15,
    seedPurchase: 30,
    stars: { 1: 100, 2: 150, 3: 200, 4: null, 5: null },
    colors: universalColors
  },

  {
    name: "Corn Poppy",
    emoji: "🌺",
    key: "corn_poppy",
    growthTime: "1 day",
    gardeningLevel: 5,
    seedSell: 30,
    seedPurchase: 60,
    stars: { 1: 185, 2: null, 3: null, 4: null, 5: null },
    colors: universalColors
  },

  {
    name: "Anthurium",
    emoji: "🌹",
    key: "anthurium",
    growthTime: null,
    gardeningLevel: 5,
    seedSell: 30,
    seedPurchase: 60,
    stars: { 1: 185, 2: null, 3: null, 4: null, 5: null },
    colors: universalColors
  },

  {
    name: "Laceleaf",
    emoji: "🪷",
    key: "laceleaf",
    growthTime: "1 day",
    gardeningLevel: 5,
    seedSell: 30,
    seedPurchase: 60,
    stars: { 1: 185, 2: null, 3: null, 4: null, 5: null },
    colors: universalColors
  },

  {
    name: "Calla Lily",
    emoji: "🌷",
    key: "calla_lily",
    growthTime: "1 day 6 hours",
    gardeningLevel: 6,
    seedSell: 45,
    seedPurchase: 90,
    stars: { 1: 250, 2: null, 3: null, 4: null, 5: null },
    colors: universalColors
  },

  {
    name: "Morning Glory",
    emoji: "💠",
    key: "morning_glory",
    growthTime: "1 day 6 hours",
    gardeningLevel: 6,
    seedSell: 45,
    seedPurchase: 90,
    stars: { 1: 250, 2: null, 3: null, 4: null, 5: null },
    colors: universalColors
  },

  {
    name: "Carnation",
    emoji: "💐",
    key: "carnation",
    growthTime: "1 day 6 hours",
    gardeningLevel: 7,
    seedSell: 60,
    seedPurchase: 120,
    stars: { 1: null, 2: null, 3: null, 4: null, 5: null },
    colors: universalColors
  },

  {
    name: "Tulip",
    emoji: "🌷",
    key: "tulip",
    growthTime: null,
    gardeningLevel: 8,
    seedSell: null,
    seedPurchase: 150,
    stars: { 1: null, 2: null, 3: null, 4: null, 5: null },
    colors: universalColors
  },

  {
    name: "Lily",
    emoji: "🌺",
    key: "lily",
    growthTime: null,
    gardeningLevel: 9,
    seedSell: null,
    seedPurchase: 200,
    stars: { 1: null, 2: null, 3: null, 4: null, 5: null },
    colors: universalColors
  },

  {
    name: "Rose",
    emoji: "🌹",
    key: "rose",
    growthTime: null,
    gardeningLevel: 10,
    seedSell: null,
    seedPurchase: 300,
    stars: { 1: null, 2: null, 3: null, 4: null, 5: null },
    colors: universalColors
  },

  {
    name: "Hyacinth",
    emoji: "🪻",
    key: "hyacinth",
    growthTime: null,
    gardeningLevel: 11,
    seedSell: null,
    seedPurchase: 300,
    stars: { 1: null, 2: null, 3: null, 4: null, 5: null },
    colors: universalColors
  },

  {
    name: "Moth Orchid",
    emoji: "🦋",
    key: "moth_orchid",
    growthTime: null,
    gardeningLevel: 12,
    seedSell: null,
    seedPurchase: 300,
    stars: { 1: null, 2: null, 3: null, 4: null, 5: null },
    colors: universalColors
  },

  {
    name: "Cranesbill",
    emoji: "🌺",
    key: "cranesbill",
    growthTime: null,
    gardeningLevel: 13,
    seedSell: null,
    seedPurchase: 300,
    stars: { 1: null, 2: null, 3: null, 4: null, 5: null },
    colors: universalColors
  }
];