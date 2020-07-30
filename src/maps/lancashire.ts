import IndustryType from "../enums/industries";
import { BoardLink, BoardLocation } from "../location";
type LancashireCity =
  "manchester" | "liverpool" |
  "preston" | "lancaster" |
  "blackburn" | "wigan" | "colne" | "oldham" | "burnley" | "birkenhead" | "macclesfield" | "warrington-runcorn" | "stockport" | "bolton" | "rochdale" | "barrow-in-furness" |
  "bury" | "fleetwood" | "ellesmere" |
  "scotland" | "blackpool" | "southport" | "northwich" | "midlands" | "yorkshire";


const lancashireLinks: BoardLink[] = [
  { nodes: ["barrow-in-furness", "lancaster"], canal: false, rail: true },
  { nodes: ["scotland", "lancaster"], canal: false, rail: true },
  { nodes: ["lancaster", "preston"], canal: true, rail: true },
  { nodes: ["preston", "fleetwood"], canal: true, rail: true },
  { nodes: ["preston", "southport"], canal: false, rail: true },
  { nodes: ["preston", "blackpool"], canal: false, rail: true },
  { nodes: ["preston", "wigan"], canal: true, rail: true },
  { nodes: ["preston", "blackburn"], canal: false, rail: true },
  { nodes: ["southport", "liverpool"], canal: false, rail: true },
  { nodes: ["southport", "wigan"], canal: false, rail: true },
  { nodes: ["liverpool", "warrington-runcorn"], canal: false, rail: true },
  { nodes: ["liverpool", "birkenhead"], canal: true, rail: false },
  { nodes: ["liverpool", "ellesmere"], canal: true, rail: false },
  { nodes: ["liverpool", "wigan"], canal: true, rail: true },
  { nodes: ["ellesmere", "warrington-runcorn"], canal: true, rail: true },
  { nodes: ["ellesmere", "birkenhead"], canal: false, rail: true },
  { nodes: ["ellesmere", "northwich"], canal: true, rail: true },
  { nodes: ["northwich", "midlands"], canal: true, rail: true },
  { nodes: ["wigan", "blackburn"], canal: true, rail: true },
  { nodes: ["wigan", "bolton"], canal: false, rail: true },
  { nodes: ["wigan", "warrington-runcorn"], canal: true, rail: true },
  { nodes: ["bolton", "bury"], canal: true, rail: true },
  { nodes: ["bolton", "blackburn"], canal: false, rail: true },
  { nodes: ["blackburn", "burnley"], canal: true, rail: true },
  { nodes: ["burnley", "colne"], canal: true, rail: true },
  { nodes: ["burnley", "bury"], canal: false, rail: true },
  { nodes: ["colne", "yorkshire"], canal: true, rail: true },
  { nodes: ["rochdale", "yorkshire"], canal: true, rail: true },
  { nodes: ["rochdale", "bury"], canal: false, rail: true },
  { nodes: ["rochdale", "oldham"], canal: true, rail: true },
  { nodes: ["manchester", "warrington-runcorn"], canal: true, rail: true },
  { nodes: ["manchester", "bolton"], canal: true, rail: true },
  { nodes: ["manchester", "bury"], canal: true, rail: true },
  { nodes: ["manchester", "oldham"], canal: true, rail: true },
  { nodes: ["manchester", "stockport"], canal: true, rail: true },
  { nodes: ["stockport", "macclesfield"], canal: true, rail: true },
  { nodes: ["midlands", "macclesfield"], canal: true, rail: true },
  { nodes: ["midlands", "scotland"], canal: true, rail: true, player: -1 },
  { nodes: ["midlands", "yorkshire"], canal: true, rail: true, player: -1 },
  { nodes: ["scotland", "yorkshire"], canal: true, rail: true, player: -1 },
];

const lancashireLocations: BoardLocation[] = [
  { city: "barrow-in-furness", spaces: [{ possible: [IndustryType.IronWorks] }, { possible: [IndustryType.Shipyard] }] },
  { city: "lancaster", spaces: [{ possible: [IndustryType.Port] }, { possible: [IndustryType.CottonMill, IndustryType.Port] }] },
  { city: "preston", spaces: [{ possible: [IndustryType.Port] }, { possible: [IndustryType.CottonMill, IndustryType.Port] }, { possible: [IndustryType.IronWorks] }] },
  { city: "manchester", spaces: [{ possible: [IndustryType.CoalMine, IndustryType.CottonMill] }, { possible: [IndustryType.CoalMine, IndustryType.CottonMill] }, { possible: [IndustryType.CoalMine, IndustryType.CottonMill] }, { possible: [IndustryType.IronWorks] }] },
  { city: "liverpool", spaces: [{ possible: [IndustryType.Port] }, { possible: [IndustryType.Port] }, { possible: [IndustryType.Port] }, { possible: [IndustryType.Shipyard] }] },
 
  { city: "blackburn", spaces: [{ possible: [IndustryType.CoalMine, IndustryType.CottonMill] }, { possible: [IndustryType.CoalMine, IndustryType.CottonMill] }, { possible: [IndustryType.IronWorks] }] },
  { city: "bolton", spaces: [{ possible: [IndustryType.CoalMine, IndustryType.CottonMill] }, { possible: [IndustryType.CoalMine, IndustryType.CottonMill] }, { possible: [IndustryType.IronWorks] }] },
  { city: "rochdale", spaces: [{ possible: [IndustryType.CoalMine, IndustryType.CottonMill] }, { possible: [IndustryType.CoalMine, IndustryType.CottonMill] }, { possible: [IndustryType.IronWorks] }] },

  { city: "burnley", spaces: [{ possible: [IndustryType.CoalMine, IndustryType.CottonMill] }, { possible: [IndustryType.CoalMine, IndustryType.CottonMill] }] },
  { city: "bury", spaces: [{ possible: [IndustryType.CoalMine, IndustryType.CottonMill] }, { possible: [IndustryType.CoalMine, IndustryType.CottonMill] }] },
  { city: "oldham", spaces: [{ possible: [IndustryType.CoalMine, IndustryType.CottonMill] }, { possible: [IndustryType.CoalMine, IndustryType.CottonMill] }] },
 
  { city: "warrington-runcorn", spaces: [{ possible: [IndustryType.CoalMine, IndustryType.CottonMill] }, { possible: [IndustryType.Port] }] },
  { city: "wigan", spaces: [{ possible: [IndustryType.CoalMine] }, { possible: [IndustryType.CoalMine] }] },

  { city: "colne", spaces: [{ possible: [IndustryType.CottonMill] }, { possible: [IndustryType.CottonMill] }] },
  { city: "stockport", spaces: [{ possible: [IndustryType.CottonMill] }, { possible: [IndustryType.CottonMill] }] },
  { city: "macclesfield", spaces: [{ possible: [IndustryType.CottonMill] }, { possible: [IndustryType.CottonMill] }] },

  { city: "fleetwood", spaces: [{ possible: [IndustryType.Port] }] },
  { city: "ellesmere", spaces: [{ possible: [IndustryType.Port] }] },
  { city: "birkenhead", spaces: [{ possible: [IndustryType.Shipyard] }] },

  { city: "southport", spaces: [{ industry: "generic", gold: 2 }] },
  { city: "blackpool", spaces: [{ industry: "generic", gold: 2 }] },
  { city: "northwich", spaces: [{ industry: "generic", gold: 2 }] },
  { city: "scotland", spaces: [{ industry: "port0", gold: 2 }] },
  { city: "yorkshire", spaces: [{ industry: "port0", gold: 2 }] },
  { city: "midlands", spaces: [{ industry: "port0", gold: 2 }] },
];


export {
  lancashireLocations,
  lancashireLinks,
  LancashireCity
};