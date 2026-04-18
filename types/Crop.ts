export interface Crop {
  name: string;
  season: string;
  growthDays: number;
  regrowthDays?: number;
  location: string;
}