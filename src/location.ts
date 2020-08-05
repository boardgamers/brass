import {LancashireCity} from "./maps/lancashire";
import IndustryType from "./enums/industries";

interface BoardLink {
  nodes: [LancashireCity, LancashireCity];
  canal:boolean;
  rail:boolean;
  player?: number;
}

interface BoardSpace {
  city?: LancashireCity;
  possible?: IndustryType[];
  industry?: string;
  player?: number;
  resources? : { coal?: number, iron?: number};
  gold?: number;
}

interface BoardLocation {
  city: LancashireCity;
  spaces: BoardSpace[];
}

interface BoardNetwork {
  cities: LancashireCity[]
}

export { BoardLink, BoardLocation, BoardNetwork, BoardSpace};