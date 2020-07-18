import {LancashireCity} from "./maps/lancashire";
import IndustryType from "./enums/industries"

interface Link {
  nodes: [LancashireCity, LancashireCity];
  canal:boolean;
  rail:boolean;
  player?: number;
};

interface Space {
  allowedIndustries: IndustryType[];
  industry?: string;
  player?: number;
  resources? : { coal?: number, iron?: number};
  gold?: number;
}

interface Location {
  city: LancashireCity;
  spaces?: Space[];
  gold?: number;
}

export { Link, Location};