import type IndustryType from "./enums/industries";
import { Period } from "./enums/phases";

type IndustryName =  "generic" | "coal1" | "coal2" | "coal3" | "coal4" | "cotton1" | "cotton2" | "cotton3" | "cotton4" | "port0" | "port1" | "port2" |"port3"|"port4"| "iron1"| "iron2"|"iron3"|"iron4"| "ship0" | "ship1" | "ship2";

interface Industry {
  type: IndustryType;
  level: number;
  cost: { coal?: number, iron?: number, money: number };
  production?: { coal?: number, iron?: number };
  income: number;
  vp: number;
  phaseLimit?: Period
}

export { IndustryName, Industry};