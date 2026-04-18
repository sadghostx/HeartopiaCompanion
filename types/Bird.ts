import { Creature } from "./Creature";

export interface Bird extends Creature {
  flightPattern?: string;
}