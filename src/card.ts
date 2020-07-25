import type IndustryType from "./enums/industries";
import { LancashireCity } from "./maps/lancashire";

export default interface Card {
  city?: LancashireCity;
  industry?: IndustryType;
};