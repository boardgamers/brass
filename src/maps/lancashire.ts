type LancashireCity = "preston" | "blackburn" | "wigan" ;

type LancashireLink = {nodes: [LancashireCity, LancashireCity], canal:boolean , rail:boolean};

const links: LancashireLink[] = [
  {nodes: ["preston", "wigan"], canal: true, rail: true},
  {nodes: ["wigan", "blackburn"], canal: true, rail: true},
  {nodes: ["preston", "blackburn"], canal: false, rail: true},
]

const map = {
  links
}

export default map;