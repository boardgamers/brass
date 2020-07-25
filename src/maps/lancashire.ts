import IndustryType from "../enums/industries";
import { BoardLink, BoardLocation } from "../location";
type LancashireCity =
  "manchester" | "liverpool" |
  "preston" | "lancaster" |
  "blackburn" | "wigan" | "colne" | "oldham" | "burnley" | "birkenhead" | "macclesfield" | "warrington-runcorn" | "stockport" | "bolton" | "rochdale" | "barrow-in-furness" |
  "bury" | "fleetwood" | "ellesmere" |
  "scotland" | "blackpool" | "southport" | "northwich" | "midlands" | "yorkshire";


const lancashireLinks: BoardLink[] = [
  { nodes: ["preston", "wigan"], canal: true, rail: true },
  { nodes: ["wigan", "blackburn"], canal: true, rail: true },
  { nodes: ["preston", "blackburn"], canal: false, rail: true },
  { nodes: ["wigan", "southport"], canal: false, rail: true },
];

const lancashireLocations: BoardLocation[] = [
  { city: "blackburn", spaces: [{ possible: [IndustryType.CoalMine, IndustryType.CottonMill] }, { possible: [IndustryType.CoalMine, IndustryType.CottonMill] }, { possible: [IndustryType.IronWorks] }] },
  { city: "southport", spaces: [{ industry: "portExternal", gold: 2 }] }
];


export {
  lancashireLocations,
  lancashireLinks,
  LancashireCity
};