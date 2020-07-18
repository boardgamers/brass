import IndustryType from "../enums/industries";
import Industry from "../industry";

const industries: Industry[] = [
  { name: "coal1", type: IndustryType.CoalMine, level: 1, cost: { money: 12}, production: {coal: 4}},
  { name: "coal2", type: IndustryType.CoalMine, level: 2, cost: { money: 12}, production: {coal: 4}}
];

const industrySet: Array<{num: number, industry: string}> = [
  { num: 3, industry: "coal1" },
  { num: 3, industry: "coal2" }
];

export {industries, industrySet};