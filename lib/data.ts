import { fishData } from "./data/fish";
import { insectsData } from "./data/insects";
import { birdsData } from "./data/birds";
import { fashionwaveData } from "./data/fashionwave";
import { StarChecklist } from "../types/Checklist";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function getAllData() {
  return {
    fish: fishData,
    insects: insectsData,
    birds: birdsData,
    fashionwave: fashionwaveData,
  };
}

export async function getChecklist(userId: string): Promise<StarChecklist> {
  const docRef = doc(db, "checklists", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as StarChecklist;
  } else {
    return {};
  }
}

export async function saveChecklist(userId: string, checklist: StarChecklist) {
  const docRef = doc(db, "checklists", userId);
  await setDoc(docRef, checklist);
}

export function filterByWeather(creatures: any[], weather: string[]) {
  if (weather.length === 0) return creatures;
  return creatures.filter(creature => 
    weather.some(w => creature.weather?.includes(w.toLowerCase()) || creature.weather?.length === 0)
  );
}

export function filterByTime(creatures: any[], times: string[]) {
  if (times.length === 0) return creatures;
  return creatures.filter(creature => 
    times.some(t => creature.time?.includes(t.toLowerCase()) || creature.time?.length === 0)
  );
}

export function filterByLocation(creatures: any[], locations: string[]) {
  if (locations.length === 0) return creatures;
  return creatures.filter(creature => 
    locations.some(l => creature.location?.toLowerCase().includes(l.toLowerCase()))
  );
}