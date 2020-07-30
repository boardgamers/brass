import { sortBy, flatten, flattenDeep, fromPairs, pick } from "lodash";
import type PlayerColor from "./enums/player-color";
import { shuffle } from "./utils/random";
import type Card from "./card";
import cardSet from "./data/cards";
import { BoardLink, BoardLocation, BoardNetwork } from "./location";
import { lancashireLocations, lancashireLinks, LancashireCity } from "./maps/lancashire";
import { EventEmitter } from "events";
import { memoize } from "./utils/memoize";

class Board extends EventEmitter {
  map: {
    model: "lancashire";
    locations: BoardLocation[],
    links: BoardLink[]
  };

  cards: Card[] = [];
  networks: BoardNetwork[] = [];

  constructor() {
    super();
  }

  init(players: number, rng: () => number) {
    this.cards = [];
    // populates the board

    this.map = {
      model: "lancashire",
      locations: lancashireLocations,
      links: lancashireLinks
    };

    const mapLinks = this.mapLinks();
  }

  mapLinks() {
    const links = new Map<string, Map<string, number>>();

    for (const link of this.map.links) {
      if (!links.has(link.nodes[0])) {
        links.set(link.nodes[0], new Map());
      }
      if (!links.has(link.nodes[1])) {
        links.set(link.nodes[1], new Map());
      }
      links.get(link.nodes[0])!.set(link.nodes[1], link.player ?? -2 );
      links.get(link.nodes[1])!.set(link.nodes[0], link.player ?? -2 );
    }

    return links;
  }

  createDeck() {
    this.cards = [];
    cardSet.forEach(cs => { for (let i = 0; i < cs.num; i++) { this.cards.push(cs.card); } });
  }

  drawCard(): Card | undefined {
    return this.cards.shift();
  }

  refreshNetworks(): void {
    function expandCity(fromCity: LancashireCity, network: BoardNetwork): void {
      network.cities.push(fromCity);
      const idx = toExpand.findIndex(city => city.city === fromCity);
      if (idx >= 0) { toExpand.splice(idx, 1); }

      for (const city of links.get(fromCity)!) {
        if (city[1] >= -1 && !network.cities.some(networkCity => networkCity === city[0])) {
          expandCity(city[0] as LancashireCity, network);
        }
      }
    }

    const toExpand = lancashireLocations;
    const links = this.formattedLinks();
    this.networks = [];
    while (toExpand.length > 0) {
      const network: BoardNetwork = { cities: [] };
      expandCity(toExpand[0].city, network);
      this.networks.push(network);
    }
  }

  @memoize()
  formattedLinks() {
    return this.mapLinks();
  }
}


export default Board;