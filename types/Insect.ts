import { Creature } from "./Creature";

export interface Insect extends Creature {
  behavior?: string;
}