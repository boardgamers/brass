import { sortBy, flatten, flattenDeep, fromPairs, pick, map } from "lodash";
import type PlayerColor from "./enums/player-color";
import { shuffle } from "./utils/random";
import type Card from "./card";
import cardSet from "./data/cards";
import { BoardLink, BoardLocation, BoardNetwork, BoardSpace } from "./location";
import { lancashireLocations, lancashireLinks, LancashireCity } from "./maps/lancashire";
import { EventEmitter } from "events";
import { memoize } from "./utils/memoize";

class Board extends EventEmitter {
  map: {
    model: "lancashire";
    locations: Map<LancashireCity, BoardSpace[]>
    links: Map<number, BoardLink>
  };

  cards: Card[] = [];
  locationLinks: Map<string, Map<string, number>>;
  networks: BoardNetwork[] = [];

  constructor() {
    super();
  }

  init(players: number, rng: () => number) {
    this.cards = [];
    // populates the board

    this.map = {
      model: "lancashire",
      locations: new Map(lancashireLocations.map(location => [location.city, location.spaces])),
      links: new Map(lancashireLinks.map((link, index) => [index, link] as [number, BoardLink]))
    };

    this.locationLinks = this.initLocationLinks();
  }

  initLocationLinks() {
    const links = new Map<string, Map<string, number>>();

    for (const [id, link] of this.map.links.entries()) {
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
    function expandCity(fromCity: LancashireCity,  network: BoardNetwork): void {
      network.cities.push(fromCity);
      cities.delete(fromCity);
      
      for (const [linkedCity, linkId] of locationLinks.get(fromCity)!.entries()) {
        if ((links.get(linkId)!.player !== undefined) && !network.cities.some(networkCity => networkCity === linkedCity)) {
          expandCity(linkedCity as LancashireCity, network);
        }
      }
      
    }

    const cities = new Set([...this.map.locations.keys()]);
    const locationLinks = this.locationLinks;
    const links = this.map.links;

    this.networks = [];
    for (const city of cities.keys()) {
      const network: BoardNetwork = { cities: [] };
      expandCity(city as LancashireCity, network);
      this.networks.push(network);
    }
  }

}


export default Board;