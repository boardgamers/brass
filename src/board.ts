import { sortBy, flatten, flattenDeep, fromPairs, pick } from "lodash";
import type PlayerColor from "./enums/player-color";
import { shuffle } from "./utils/random";
import type Card from "./card";
import cardSet from "./data/cards";
import { BoardLink, BoardLocation } from "./location";
import { lancashireLocations, lancashireLinks } from "./maps/lancashire";
import { EventEmitter } from "events";


class Board extends EventEmitter {
  map: {
    model: "lancashire";
    locations: BoardLocation[],
    links: BoardLink[]
  };

  cards: Card[] = [];

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
      links.get(link.nodes[0])!.set(link.nodes[1], 0);
      links.get(link.nodes[1])!.set(link.nodes[0], 0);
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
}


export default Board;