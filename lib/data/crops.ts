export interface Crop {
  name: string;
  emoji: string;
  key: string;

  growthTime: string;          // "60 min", "4 hours", etc.
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

  collected: {
    1: boolean;
    2: boolean;
    3: boolean;
    4: boolean;
    5: boolean;
  };
}

export const cropsData: Crop[] = [
  {
    name: "Potatoes",
    emoji: "🥔",
    key: "potato",
    growthTime: "60 min",
    gardeningLevel: 1,
    seedSell: 15,
    seedPurchase: 30,
    stars: { 1: 90, 2: 120, 3: 150, 4: 180, 5: null },
    collected: { 1: false, 2: false, 3: false, 4: false, 5: false }
  },

  {
    name: "Tomato",
    emoji: "🍅",
    key: "tomato",
    growthTime: "15 min",
    gardeningLevel: 1,
    seedSell: 5,
    seedPurchase: 10,
    stars: { 1: 30, 2: 40, 3: 50, 4: 60, 5: 70 },
    collected: { 1: false, 2: false, 3: false, 4: false, 5: false }
  },

  {
    name: "Wheat",
    emoji: "🌾",
    key: "wheat",
    growthTime: "4 hours",
    gardeningLevel: 2,
    seedSell: 47,
    seedPurchase: 95,
    stars: { 1: 285, 2: 381, 3: 475, 4: 570, 5: null },
    collected: { 1: false, 2: false, 3: false, 4: false, 5: false }
  },

  {
    name: "Lettuce",
    emoji: "🥬",
    key: "lettuce",
    growthTime: "8 hours",
    gardeningLevel: 3,
    seedSell: 72,
    seedPurchase: 145,
    stars: { 1: 435, 2: 582, 3: 726, 4: null, 5: null },
    collected: { 1: false, 2: false, 3: false, 4: false, 5: false }
  },

  {
    name: "Pineapple",
    emoji: "🍍",
    key: "pineapple",
    growthTime: "30 min",
    gardeningLevel: 4,
    seedSell: 7,
    seedPurchase: 15,
    stars: { 1: 52, 2: 69, 3: 86, 4: 104, 5: null },
    collected: { 1: false, 2: false, 3: false, 4: false, 5: false }
  },

  {
    name: "Carrot",
    emoji: "🥕",
    key: "carrot",
    growthTime: "2 hours",
    gardeningLevel: 5,
    seedSell: 25,
    seedPurchase: 50,
    stars: { 1: 155, 2: 207, 3: 258, 4: 310, 5: null },
    collected: { 1: false, 2: false, 3: false, 4: false, 5: false }
  },

  {
    name: "Strawberry",
    emoji: "🍓",
    key: "strawberry",
    growthTime: "6 hours",
    gardeningLevel: 6,
    seedSell: 62,
    seedPurchase: 125,
    stars: { 1: 375, 2: 502, 3: 626, 4: 750, 5: 1125 },
    collected: { 1: false, 2: false, 3: false, 4: false, 5: false }
  },

  {
    name: "Corn",
    emoji: "🌽",
    key: "corn",
    growthTime: "12 hours",
    gardeningLevel: 6,
    seedSell: 85,
    seedPurchase: 170,
    stars: { 1: 515, 2: 690, 3: 860, 4: null, 5: null },
    collected: { 1: false, 2: false, 3: false, 4: false, 5: false }
  },

  {
    name: "Grape",
    emoji: "🍇",
    key: "grape",
    growthTime: "10 hours",
    gardeningLevel: 7,
    seedSell: 80,
    seedPurchase: 160,
    stars: { 1: 480, 2: 643, 3: 801, 4: null, 5: null },
    collected: { 1: false, 2: false, 3: false, 4: false, 5: false }
  },

  {
    name: "Eggplant",
    emoji: "🍆",
    key: "eggplant",
    growthTime: null,
    gardeningLevel: 8,
    seedSell: null,
    seedPurchase: 135,
    stars: { 1: null, 2: null, 3: null, 4: null, 5: null },
    collected: { 1: false, 2: false, 3: false, 4: false, 5: false }
  },

  {
    name: "Tea Tree",
    emoji: "🍵",
    key: "tea_tree",
    growthTime: null,
    gardeningLevel: 11,
    seedSell: null,
    seedPurchase: 25,
    stars: { 1: null, 2: null, 3: null, 4: null, 5: null },
    collected: { 1: false, 2: false, 3: false, 4: false, 5: false }
  },

  {
    name: "Cacao",
    emoji: "🍫",
    key: "cacao",
    growthTime: null,
    gardeningLevel: 12,
    seedSell: null,
    seedPurchase: 110,
    stars: { 1: null, 2: null, 3: null, 4: null, 5: null },
    collected: { 1: false, 2: false, 3: false, 4: false, 5: false }
  },

  {
    name: "Avocado",
    emoji: "🥑",
    key: "avocado",
    growthTime: null,
    gardeningLevel: 13,
    seedSell: null,
    seedPurchase: 180,
    stars: { 1: null, 2: null, 3: null, 4: null, 5: null },
    collected: { 1: false, 2: false, 3: false, 4: false, 5: false }
  }
];