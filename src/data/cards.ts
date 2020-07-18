import type Card from "../card";
import {LancashireCity} from "../maps/lancashire";
import IndustryType from "../enums/industries";

const cardSet: Array<{num: number, card: Card}> = [
  {num: 3, card: { city: "preston"}},
  {num: 3, card: { industry: IndustryType.CoalMine}},
];

export default cardSet;