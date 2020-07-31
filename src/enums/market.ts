type Market = "coal" | "iron" | "cotton" ;

export default Market;

namespace Market {
  export function values(): Market[] {
    return ["coal", "iron", "cotton"];
  }
}