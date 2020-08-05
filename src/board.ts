import { sortBy, flatten, flattenDeep, fromPairs, pick, map } from "lodash";
import type PlayerColor from "./enums/player-color";
import { shuffle } from "./utils/random";
import type Card from "./card";
import cardSet from "./data/cards";
import { BoardLink, BoardLocation, BoardNetwork, BoardSpace } from "./location";
import { lancashireLocations, lancashireLinks, LancashireCity } from "./maps/lancashire";
import Market from "./enums/market";
import { EventEmitter } from "events";
import { memoize } from "./utils/memoize";
import IndustryType from "./enums/industries";

class Board extends EventEmitter {

  model: "lancashire";
  locations: Map<LancashireCity, { spaces: string[] }>;
  spaces: Map<string, BoardSpace>;
  links: Map<number, BoardLink>;
  locationLinks: Map<string, Map<string, number>>;
  networks: BoardNetwork[] = [];

  cards: Card[] = [];
  markets: { [key in Market]: number };

  constructor() {
    super();
  }

  init(players: number, rng: () => number) {
    this.cards = [];
    // populates the board
    this.locations = new Map();
    this.spaces = new Map();

    this.links = new Map(lancashireLinks.map((link, index) => [index, link] as [number, BoardLink]));
    this.locationLinks = this.initLocationLinks();
    lancashireLocations.forEach(location => {
      const locSpaces: string[] = [];
      location.spaces?.forEach((space, index) => {
        const id = location.city + '_' + index;
        this.spaces.set(id, { city: location.city, ...space });
        locSpaces.push(id);
      });
      this.locations.set(location.city, { spaces: locSpaces });
    });

    this.markets = { coal: 8, iron: 8, cotton: 8 };
  }

  initLocationLinks() {
    const links = new Map<string, Map<string, number>>();

    for (const [id, link] of this.links.entries()) {
      if (!links.has(link.nodes[0])) {
        links.set(link.nodes[0], new Map());
      }
      if (!links.has(link.nodes[1])) {
        links.set(link.nodes[1], new Map());
      }
      links.get(link.nodes[0])!.set(link.nodes[1], id);
      links.get(link.nodes[1])!.set(link.nodes[0], id);
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
      cities.delete(fromCity);

      for (const [linkedCity, linkId] of locationLinks.get(fromCity)!.entries()) {
        if ((links.get(linkId)!.player !== undefined) && !network.cities.some(networkCity => networkCity === linkedCity)) {
          expandCity(linkedCity as LancashireCity, network);
        }
      }

    }

    const cities = new Set([...this.locations.keys()]);
    const locationLinks = this.locationLinks;
    const links = this.links;

    this.networks = [];
    for (const city of cities.keys()) {
      const network: BoardNetwork = { cities: [] };
      expandCity(city as LancashireCity, network);
      this.networks.push(network);
    }
  }

  marketCost(market: Market): number {
    if (market === "cotton") {
      return Math.floor((this.markets.cotton - 1) / 2);
    }
    return 5 - Math.ceil(this.markets[market] / 2);
  }

  ironSpaces(): string[] {
    const found: string[] = [];
    for (const space of this.spaces) {
      if (space[1].resources?.iron ?? 0 > 0) {
        found.push(space[0]);
      }
    }
    return found;
  }

}


export default Board;