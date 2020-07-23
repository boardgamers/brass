import { Player } from "./player";
import type PlayerColor from "./enums/player-color";
import Board from "./board";
import Card from "./card";
import { shuffle } from "./utils/random";
import { MajorPhase, RoundPhase } from "./enums/phases";
import { LogItem, GameEventName, GameEventData, GameEvent } from "./log";
import { memoize } from "./utils/memoize";
import BaseEngine from "./utils/base-engine";
import { MoveName } from "./enums/moves";
import commands from './commands';
import { omit } from "lodash";
import { runInThisContext } from "vm";

export class Engine extends BaseEngine<Player, RoundPhase, MoveName, GameEventName, PlayerColor, LogItem> {
  turnorder: PlayerColor[];

  board: Board;
  majorPhase: MajorPhase;

  init (players: number, seed: string) {
    this.seed = seed;
    this.board = new Board();
    this.board.init(players, this.rng);
    this.players = [];
    this.round = 0;

    const colors: PlayerColor[] = shuffle(["red", "green", "purple", "yellow"] as PlayerColor[], this.rng).slice(0, players);

    for (let i = 0; i < players; i++) {
      this.players.push(new Player(colors[i], i));
    }

    for (const player of this.players) {
      player.on("event", (event, data) => this.addEvent(event.name, {...data, player: player.color}));
    }
    this.board.on("event", (event, data) => this.addEvent(event.name, data));

    this.addEvent(GameEventName.PhaseChange, {phase: RoundPhase.GameSetup});
  }

  gameStart() {
   
    this.majorPhase = MajorPhase.CanalPhase;
    this.addEvent(GameEventName.PhaseChange, {phase: RoundPhase.PeriodSetup});
  }

  periodStart() {
    // set Demand tracks
    // shuffle Distant Market
    this.board.createDeck();
    shuffle(this.board.cards, this.rng); 
    // discard cards
    this.board.cards.splice(0, discard[this.players.length - 3][this.majorPhase]);

    this.addEvent(GameEventName.PhaseChange, {phase: RoundPhase.RoundSetup});
  }

  roundStart() {
    this.round += 1;
    // new turnorder based on spent in previous round
    // this.addEvent(GameEventName.TurnOrder, {turnorder: this.players.map(player => player.color)});
    // set first player
    
    for (const player of this.players) {
      // reset moves
      player.numMoves = 0;
      // refill cards if still cards to draw
      if (this.board.cards.length >= discard[this.players.length - 3][this.majorPhase]) {
        for (let i = 1; i< 8 - player.cards.length ; i++){
          const card = this.board.cards.slice()[0];
          player.cards.push( card )
        }
      };
      // add income
    }
    

    this.addEvent(GameEventName.PhaseChange, {phase: RoundPhase.PlayCards});
  }


  switchToNextPlayer() {
    // player has to do two moves
    if ( this.player(this.currentPlayer).numMoves<=2 && !(this.round === 1)) {
      return;
    }

    const currentIndex = this.turnorder.indexOf(this.currentPlayer);
    if (currentIndex + 1 === this.turnorder.length) {
      // last round
      if (this.round === lastRound[this.players.length - 3] || this.round === 2 * lastRound[this.players.length - 3])
        this.addEvent(GameEventName.PhaseChange, {phase: RoundPhase.VP});
      else
        this.addEvent(GameEventName.PhaseChange, {phase: RoundPhase.RoundSetup});
    } else {
      this.currentPlayer = this.turnorder[currentIndex + 1];
    }
  }

  addEvent<name extends GameEventName>(name: name, data?: name extends keyof GameEventData ? GameEventData[name] : undefined) {
    this.addLog({kind: "event", event: {name, ...(data ?? {})} as GameEvent})
  }

  processLogItem(item: LogItem) {
    switch (item.kind) {
      case "event":
        const event = item.event;
        switch (event.name) {
          case GameEventName.GameStart:
            this.gameStart();
            break;
          case GameEventName.PeriodStart:
            this.periodStart();
            break;
          case GameEventName.RoundStart:
            this.roundStart();
            break;
          case GameEventName.PhaseChange:
            this.phase = event.phase;
            break;
          case GameEventName.TurnOrder:
            this.turnorder = event.turnorder;
            break;
          case GameEventName.CurrentPlayer:
            this.currentPlayer = event.player;
            break;
        }
        break;
      case "move":
        const move = item.move;
        switch (move.name) {
          case MoveName.TakeLoan:
            const player = this.player(item.player);
            player.money += move.data.loan;
            // TD decrease income
            
            player.cards.splice( player.cards.findIndex( card => (card.city === move.data.card.city || card.industry === move.data.card.industry)));
            player.numMoves += 1;
            this.switchToNextPlayer;
            break;
        }
        break;
    }
  }

  


  fillUpPlayerCards(player: Player) {

  }

  get currentPlayer() {
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

  @memoize()
  formattedLinks() {
    return this.board.mapLinks();
  }

  get maxCitiesPerLocation() {

    return 3;
  }
}

const discard = [{
  [MajorPhase.CanalPhase]: 9,
  [MajorPhase.RailPhase]: 6
}, {
  [MajorPhase.CanalPhase]: 9,
  [MajorPhase.RailPhase]: 6
}];

const lastRound = [11, 9];
