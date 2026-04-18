import { Creature } from "./Creature";

export interface Fish extends Creature {
  size?: string;
  rarity?: string;
}