export interface Creature {
  name: string;
  category: "fish" | "insect" | "bird";
  location: string;
  weather: string[];
  timeOfDay: string[];
  stars: number[];
  notes?: string;
}