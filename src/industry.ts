import type IndustryType from "./enums/industries";

export default interface Industry {
  name: string;
  type: IndustryType;
  level: number;
  cost: { coal?: number, iron?: number, money: number};
  production? : { coal?: number, iron?: number}
}