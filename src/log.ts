import { RoundPhase, MajorPhase } from "./enums/phases";
import type PlayerColor from "./enums/player-color";
import type { Command } from "./commands";
import { MoveName } from "./enums/moves";
import Resource from "./enums/resource";

export enum GameEventName {
  GameStart = "gamestart",
  PeriodStart = "periodstart",
  RoundStart = "roundstart",
  VictoryPoint = "vp",
  TurnOrder = "turnorder",
  CurrentPlayer = "currentplayer",
  PhaseChange = "phasechange",
  MajorPhaseChange = "majorphasechange",
  GameEnd = "gameend"
}

export interface GameEventData {
  [GameEventName.GameStart]: {},
  [GameEventName.PeriodStart]: {},
  [GameEventName.RoundStart]: {},
  [GameEventName.VictoryPoint]: {},
  [GameEventName.PhaseChange]: {phase: RoundPhase},
  [GameEventName.MajorPhaseChange]: {phase: MajorPhase},
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