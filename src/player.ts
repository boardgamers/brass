import type Resource from "./enums/resource";
import type PlayerColor from "./enums/player-color";
import type Card from "./card";

import { sumBy } from "lodash";
import { EventEmitter } from "events";
import { GameEventName } from "./log";
import Industry from "./industry";

export class Player extends EventEmitter {
  name?: string;
  money: number = 30;
  spent: number = 0;
  cards: Card[] = [];
  locations: string[] = [];
  industries: Industry[] = [];
  linksAvailable: number = 12;
  numMoves: number = 0;
  

  constructor (public color: PlayerColor, initialBid: number) {
    super();
    this.spent = initialBid;
  }

  init() {
    // assign industries cards
  }

  beginRound() {
    return;
  }

 
}
