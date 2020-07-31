import IndustryType from "../enums/industries";
import { IndustryName, Industry } from "../industry";
import { Period } from "../enums/phases";

const industries: Map<IndustryName, Industry> = new Map([
  ["cotton1", { type: IndustryType.CottonMill, level: 1, cost: { money: 12 }, income: 5, vp: 3, production: {}, period: Period.CanalPeriod }],
  ["cotton2", { type: IndustryType.CottonMill, level: 2, cost: { money: 14, coal: 1 }, income: 4, vp: 5, production: {} }],
  ["cotton3", { type: IndustryType.CottonMill, level: 3, cost: { money: 16, coal: 1, iron: 1 }, income: 3, vp: 9, production: {} }],
  ["cotton4", { type: IndustryType.CottonMill, level: 4, cost: { money: 18, coal: 1, iron: 1 }, income: 2, vp: 12, production: {} }],
  ["port0", { type: IndustryType.Port, level: 5, cost: { money: 0}, income: 0, vp: 0, production: {} }], //used for external ports
  ["port1", { type: IndustryType.Port, level: 1, cost: { money: 6 }, income: 3, vp: 2, production: {}, period: Period.CanalPeriod }],
  ["port2", { type: IndustryType.Port, level: 2, cost: { money: 7 }, income: 3, vp: 4, production: {} }],
  ["port3", { type: IndustryType.Port, level: 3, cost: { money: 8 }, income: 4, vp: 6, production: {} }],
  ["port4", { type: IndustryType.Port, level: 4, cost: { money: 9 }, income: 4, vp: 9, production: {} }],
  ["coal1", { type: IndustryType.CoalMine, level: 1, cost: { money: 5 }, income: 4, vp: 1, production: { coal: 2 }, period: Period.CanalPeriod }],
  ["coal2", { type: IndustryType.CoalMine, level: 2, cost: { money: 7 }, income: 7, vp: 2, production: { coal: 3 } }],
  ["coal3", { type: IndustryType.CoalMine, level: 3, cost: { money: 8, iron: 1 }, income: 6, vp: 3, production: { coal: 4 } }],
  ["coal4", { type: IndustryType.CoalMine, level: 4, cost: { money: 10, iron: 1 }, income: 5, vp: 4, production: { coal: 5 } }],
  ["iron1", { type: IndustryType.IronWorks, level: 1, cost: { money: 5, coal: 1 }, income: 3, vp: 3, production: { iron: 4 }, period: Period.CanalPeriod }],
  ["iron2", { type: IndustryType.IronWorks, level: 2, cost: { money: 7, coal: 1 }, income: 3, vp: 5, production: { iron: 4 } }],
  ["iron3", { type: IndustryType.IronWorks, level: 3, cost: { money: 9, coal: 1 }, income: 2, vp: 7, production: { iron: 5 } }],
  ["iron4", { type: IndustryType.IronWorks, level: 4, cost: { money: 12, coal: 1 }, income: 1, vp: 9, production: { iron: 6 } }],
  ["ship0", { type: IndustryType.Shipyard, level: 0, cost: { money: 0 }, income: 0, vp: 0, production: {}, period: Period.NeverPeriod }],
  ["ship1", { type: IndustryType.Shipyard, level: 1, cost: { money: 16 }, income: 2, vp: 10, production: {}, period: Period.CanalPeriod }],
  ["ship2", { type: IndustryType.Shipyard, level: 2, cost: { money: 25 }, income: 1, vp: 18, production: {}, period: Period.RailPeriod }],
  ["generic", { type: IndustryType.Generic, level: 5, cost: { money: 0 }, income: 0, vp: 0, production: {} }],
]);

const industrySet: Array<{ num: number, industry: IndustryName }> = [
  { num: 3, industry: "cotton1" },
  { num: 3, industry: "cotton2" },
  { num: 3, industry: "cotton3" },
  { num: 3, industry: "cotton4" },
  { num: 2, industry: "port1" },
  { num: 2, industry: "port2" },
  { num: 2, industry: "port3" },
  { num: 2, industry: "port4" },
  { num: 1, industry: "coal1" },
  { num: 2, industry: "coal2" },
  { num: 2, industry: "coal3" },
  { num: 2, industry: "coal4" },
  { num: 1, industry: "iron1" },
  { num: 1, industry: "iron2" },
  { num: 1, industry: "iron3" },
  { num: 1, industry: "iron4" },
  { num: 2, industry: "ship0" },
  { num: 2, industry: "ship1" },
  { num: 2, industry: "ship2" }

];

export { industries, industrySet };