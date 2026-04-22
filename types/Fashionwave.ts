export interface FashionwaveItem {
  name: string;
  location: string;
  weather: string[];
  time: string[];
  stars: { [key: number]: number };
}