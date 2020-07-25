import type Card from "../card";
import { LancashireCity } from "../maps/lancashire";
import IndustryType from "../enums/industries";


const cardSet: Array<{ num: number, card: Card }> = [
  { num: 4, card: { city: "manchester" } },
  { num: 4, card: { city: "liverpool" } },
  { num: 3, card: { city: "preston" } },
  { num: 3, card: { city: "lancaster" } },

  { num: 2, card: { city: "blackburn" } },
  { num: 2, card: { city: "wigan" } },
  { num: 2, card: { city: "colne" } },
  { num: 2, card: { city: "oldham" } },
  { num: 2, card: { city: "burnley" } },
  { num: 2, card: { city: "birkenhead" } },
  { num: 2, card: { city: "macclesfield" } },
  { num: 2, card: { city: "warrington-runcorn" } },
  { num: 2, card: { city: "stockport" } },
  { num: 2, card: { city: "bolton" } },
  { num: 2, card: { city: "rochdale" } },
  { num: 2, card: { city: "barrow-in-furness" } },

  { num: 1, card: { city: "bury" } },
  { num: 1, card: { city: "fleetwood" } },
  { num: 1, card: { city: "ellesmere" } },

  { num: 5, card: { industry: IndustryType.CoalMine } },
  { num: 3, card: { industry: IndustryType.IronWorks } },
  { num: 6, card: { industry: IndustryType.Port } },
  { num: 8, card: { industry: IndustryType.CottonMill } },
  { num: 3, card: { industry: IndustryType.Shipyard } },
];

export default cardSet;