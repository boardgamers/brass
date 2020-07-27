import { State } from "./enums/phases";
import { MoveName } from "./enums/moves";
import type { Engine } from "./engine";
import type { Player } from "./player";
import type Card from "./card";
import type { CommandStruct, Command as BaseCommand } from "./utils/commands";
import { GameEventName } from "./log";
import Resource from "./enums/resource";
import { fromPairs, inRange, sum, sumBy } from "lodash";
import shortestPath from "./utils/shortest-path";
import { link } from "fs";

export interface AvailableCommandArguments {
  [MoveName.TakeLoan]: {loans: number[]};
}

export interface CommandArguments {
  [MoveName.TakeLoan]: {card: Card, loan: number};
}

const commands: CommandStruct<State, MoveName, Player, Engine, AvailableCommandArguments, CommandArguments> = {
  [State.GameSetup]: {
    started(engine: Engine) {
      engine.stateGameSetup();
      engine.addEvent(GameEventName.StateChange, {state: State.PeriodSetup});
    }
  },
  [State.PeriodSetup]: {
    started(engine: Engine) {
      engine.statePeriodSetup();
      engine.addEvent(GameEventName.StateChange, {state: State.RoundSetup});
    }
  },
  [State.RoundSetup]: {
    started(engine: Engine) {
      engine.stateRoundSetup();
      engine.addEvent(GameEventName.StateChange, {state: State.PlayerTurn});
    }
  },
  [State.NextPlayer]: {
    started(engine: Engine) {
      engine.stateNextPlayer();
    }
  },
  [State.PlayerTurn]: {
    moves: {
      [MoveName.TakeLoan]: {
        available(engine: Engine, player: Player) {
          // check if can get new loans
          return {loans: [10, 20, 30]};
        },
        valid(move, available, engine, player) {
          const loanOK = available.loans.includes(move.loan);
          const cardOK = player.cards.some( card => (card.city === move.card.city || card.industry === move.card.industry));
     
          return loanOK && cardOK;
        }
      }
    }
  }
};

export type Command = BaseCommand<MoveName, CommandArguments>;

export default commands;