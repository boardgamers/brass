import IndustryType from "../enums/industries";
type LancashireCity = "preston" | "blackburn" | "wigan" | "southport";

type LancashireLink = {nodes: [LancashireCity, LancashireCity], canal:boolean , rail:boolean};
type LocationModel = {city: LancashireCity, spaces?: Array<IndustryType[]>, gold?: number};

const links: LancashireLink[] = [
  {nodes: ["preston", "wigan"], canal: true, rail: true},
  {nodes: ["wigan", "blackburn"], canal: true, rail: true},
  {nodes: ["preston", "blackburn"], canal: false, rail: true},
  {nodes: ["wigan", "southport"], canal: false, rail: true},
]

const locations: LocationModel[] = [
  {city: "blackburn", spaces: [[IndustryType.CoalMine, IndustryType.CottonMill], [IndustryType.CoalMine, IndustryType.CottonMill], [IndustryType.IronWorks]]},
  {city: "southport", gold: 2}
];


export {
  locations,
  links,
  LancashireCity
};