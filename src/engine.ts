import { Player } from "./player";
import type PlayerColor from "./enums/player-color";
import Board from "./board";
import Card from "./card";
import { shuffle } from "./utils/random";
import { State, Period } from "./enums/phases";
import { LogItem, GameEventName, GameEventData, GameEvent } from "./log";
import { memoize } from "./utils/memoize";
import BaseEngine from "./utils/base-engine";
import { MoveName } from "./enums/moves";
import commands from './commands';
import { sortBy } from "lodash";

export class Engine extends BaseEngine<Player, State, MoveName, GameEventName, PlayerColor, LogItem> {
  turnorder: PlayerColor[];

  board: Board;
  period: Period;

  init(players: number, seed: string): void {
    this.seed = seed;
    this.board = new Board();
    this.board.init(players, this.rng);
    this.players = [];

    const colors: PlayerColor[] = shuffle(["red", "green", "purple", "yellow"] as PlayerColor[], this.rng).slice(0, players);

    for (let i = 0; i < players; i++) {
      this.players.push(new Player(colors[i], i));
    }

    for (const player of this.players) {
      player.on("event", (event, data) => this.addEvent(event.name, { ...data, player: player.color }));
    }
    this.board.on("event", (event, data) => this.addEvent(event.name, data));

    this.state = State.GameSetup;
  }

  stateGameSetup(): void {
    this.round = 0;
    this.period = Period.CanalPeriod;
    this.addEvent(GameEventName.GameStart);
    this.state = State.PeriodSetup;
  }

  statePeriodSetup(): void {
    // set Demand tracks
    // shuffle Distant Market
    this.board.createDeck();
    this.board.cards = shuffle([...this.board.cards], this.rng);
    // discard cards
    this.board.cards = this.board.cards.slice(discard[this.players.length - 3][this.period]);
    this.state = State.RoundSetup;
  }

  stateRoundSetup(): void {
    this.round += 1;
    this.addEvent(GameEventName.RoundStart, { round: this.round });

    for (const player of this.players) {
      // reset moves
      player.numMoves = 0;
      // refill cards if still cards to draw
      if (this.board.cards.length > 0) {
        const cards = this.board.cards.splice(0, 8 - player.cards.length);
        this.player(player.color).cards.push(...cards);
        this.addEvent(GameEventName.RefillHand, { player: player.color, cards });
      }
      // add income
    }

    // new turnorder based on spent in previous round
    const sortedPlayers = sortBy([...this.players], "spent");
    this.turnorder = sortedPlayers.map(player => player.color);
    this.addEvent(GameEventName.TurnOrder, { turnorder: this.turnorder });
    // set first player
    this.currentPlayer = this.turnorder[0];
    this.addEvent(GameEventName.CurrentPlayer, { player: this.currentPlayer });
    this.state = State.PlayerTurn;
  }

  statePlayerTurn(): void {
    this.generateAvailableCommands();
  }

  stateNextPlayer(): void {
    // player has to do two moves. Only one in first round
    if (this.player(this.currentPlayer).numMoves <= 2 && !(this.round === 1)) {
      this.state = State.PlayerTurn;
      return;
    }

    const currentIndex = this.turnorder.indexOf(this.currentPlayer);
    if (currentIndex + 1 === this.turnorder.length) {
      // last round
      if (this.round === lastRound[this.players.length - 3] || this.round === 2 * lastRound[this.players.length - 3])
        this.state = State.GameEnd;
      else {
        this.state = State.RoundSetup;

      }

    } else {
      this.currentPlayer = this.turnorder[currentIndex + 1];
      this.state = State.PlayerTurn;
    }
  }

  addEvent<name extends GameEventName>(name: name, data?: name extends keyof GameEventData ? GameEventData[name] : undefined) {
    this.addLog({ kind: "event", event: { name, ...(data ?? {}) } as GameEvent });
  }
  
  moveTakeLoan( player: Player, data: any ) {
    player.money += data.loan;
    player.reduceIncome(data.loan);
    player.cards.splice(player.cards.findIndex(card => (card.city === data.card.city || card.industry === data.card.industry)), 1);
    player.numMoves += 1;
    this.state = State.NextPlayer;
  }

  processLogItem(item: LogItem) {
    switch (item.kind) {
      case "event": {
        const event = item.event;
        break;
      }
      case "move": {
        const move = item.move;
        switch (move.name) {
          case MoveName.TakeLoan: {
            this.moveTakeLoan(this.player(item.player),move.data);
            break;
          }
        }
      }
    }
  } 

  get currentPlayer(): PlayerColor {
    return super.currentPlayer;
  }

 set currentPlayer(color: PlayerColor) {
    super.currentPlayer = color;
  }

  commands() {
    return commands;
  }

  @memoize()
  player(color: PlayerColor) {
    return this.players.find(pl => pl.color === color)!;
  }
}

const discard = [{
  [Period.CanalPeriod]: 9,
  [Period.RailPeriod]: 6
}, {
  [Period.CanalPeriod]: 9,
  [Period.RailPeriod]: 6
}];

const lastRound = [11, 9];
