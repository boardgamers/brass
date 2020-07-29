import type Resource from "./enums/resource";
import type PlayerColor from "./enums/player-color";
import type Card from "./card";

import { sumBy, ceil } from "lodash";
import { EventEmitter } from "events";
import { GameEventName } from "./log";
import Industry from "./industry";

export class Player extends EventEmitter {
  name?: string;
  money = 30;
  spent = 0;
  income = 0;
  incomeLevel = 10;
  cards: Card[] = [];
  locations: string[] = [];
  industries: Industry[] = [];
  linksAvailable = 12;
  numMoves = 0;


  constructor(public color: PlayerColor, initialBid: number) {
    super();
    this.spent = initialBid;
  }

  init() {
    // assign industries cards
  }

  beginRound() {
    return;
  }

  incomeByLevel(level: number) {
    return level >= 100 ? 30 : level > 60 ? 20 + Math.ceil((level - 60) / 4) : level > 30 ? 10 + Math.ceil((level - 30) / 3) : level > 10 ? Math.ceil((level - 10) / 2) : level - 10;
  }

  reduceIncome(loan: number) {
    const target = this.income - loan / 10;
    while (this.incomeByLevel(this.incomeLevel) > target) {
      this.incomeLevel -= 1; 
    }
    this.income = this.incomeByLevel(this.incomeLevel);
  }


}

