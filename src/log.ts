import { RoundPhase, MajorPhase } from "./enums/phases";
import type PlayerColor from "./enums/player-color";
import type { Command } from "./commands";
import { MoveName } from "./enums/moves";
import Resource from "./enums/resource";
import Card from "./card";

export enum GameEventName {
  GameStart = "gamestart",
  MajorPhaseChange = "majorphasechange",
  RoundStart = "roundstart",
  RefillHand = "refillhand",
  VictoryPoint = "vp",
  TurnOrder = "turnorder",
  CurrentPlayer = "currentplayer",
  PhaseChange = "phasechange",
  GameEnd = "gameend"
}

export interface GameEventData {
  [GameEventName.GameStart]: {numPlayers: number, seed: string},
  [GameEventName.MajorPhaseChange]: {phase: MajorPhase},
  [GameEventName.RoundStart]: {round: number},
  [GameEventName.RefillHand]: {player: PlayerColor, cards: Card[]},
  [GameEventName.VictoryPoint]: {},
  [GameEventName.PhaseChange]: {phase: RoundPhase}, 
  [GameEventName.TurnOrder]: {turnorder: PlayerColor[]},
  [GameEventName.CurrentPlayer]: {player: PlayerColor}
}

export type GameEvents = {[key in GameEventName]: key extends keyof GameEventData ? {name: key} & GameEventData[key] : {name: key}};

export type GameEvent = GameEvents[GameEventName];

//type Distribute<U> = U extends {move: MoveName} ? Omit<U, "move"> & {name: U["move"]} : never;

export type LogItem = {
  kind: "event",
  event: GameEvent
} | {
  kind: "move",
  player: PlayerColor,
  move: Command
};