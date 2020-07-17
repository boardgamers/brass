import type LancashireCity from "./maps";
import IndustryType from "./enums/industries"
import Industry from "./industry"

interface Space {
  AllowedIndustries: IndustryType[];
  Industry?: Industry;
}

export default interface Location {
  city: LancashireCity;
  spaces: Space[];
}