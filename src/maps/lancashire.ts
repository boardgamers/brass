import IndustryType from "../enums/industries";
import {BoardLink, BoardLocation} from "../location";
type LancashireCity = "preston" | "blackburn" | "wigan" | "southport";


const lancashireLinks: BoardLink[] = [
  {nodes: ["preston", "wigan"], canal: true, rail: true},
  {nodes: ["wigan", "blackburn"], canal: true, rail: true},
  {nodes: ["preston", "blackburn"], canal: false, rail: true},
  {nodes: ["wigan", "southport"], canal: false, rail: true},
]

const lancashireLocations: BoardLocation[] = [
  {city: "blackburn", spaces: [{possible: [IndustryType.CoalMine, IndustryType.CottonMill]} , {possible: [IndustryType.CoalMine, IndustryType.CottonMill]}, {possible: [IndustryType.IronWorks]}]},
  {city: "southport", spaces: [{industry: "portExternal", gold: 2}]}
];


export {
  lancashireLocations,
  lancashireLinks,
  LancashireCity
};