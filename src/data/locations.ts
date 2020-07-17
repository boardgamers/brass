import type Location from "../location";
import IndustryType from "../enums/industries";

const locations: Location[] = [
  { city: "blackburn", spaces: [ 
    {AllowedIndustries:[ IndustryType.CoalMine, IndustryType.CottonMill]},
    {AllowedIndustries:[ IndustryType.CoalMine, IndustryType.CottonMill]},
    {AllowedIndustries:[ IndustryType.IronWorks]}]
  }
];

export default locations;