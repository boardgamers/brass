import { State } from "./enums/phases";
import { MoveName } from "./enums/moves";
import type { Engine } from "./engine";
import type { Player } from "./player";
import type Card from "./card";
import type { CommandStruct, Command as BaseCommand } from "./utils/commands";
import { GameEventName } from "./log";
import { fromPairs, inRange, sum, sumBy } from "lodash";
import shortestPath from "./utils/shortest-path";
import { link } from "fs";
import IndustryType from "./enums/industries";
import { IndustryName, Industry } from "./industry";
import { BoardLocation } from "./location";

export interface AvailableCommandArguments {
  [MoveName.TakeLoan]: { loans: number[] };
  [MoveName.Development]: { discard: IndustryName[], ironFrom?: string[] };
}

export interface CommandArguments {
  [MoveName.TakeLoan]: { card: Card, loan: number };
  [MoveName.Development]: { discard: IndustryName, ironFrom?: string };
}

const commands: CommandStruct<State, MoveName, Player, Engine, AvailableCommandArguments, CommandArguments> = {
  [State.GameSetup]: {
    started(engine: Engine) {
      engine.stateGameSetup();
    }
  },
  [State.PeriodSetup]: {
    started(engine: Engine) {
      engine.statePeriodSetup();
    }
  },
  [State.RoundSetup]: {
    started(engine: Engine) {
      engine.stateRoundSetup();
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
          if (engine.phase ?? 0) {
            return false;
          }
          // check if can get new loans
          return { loans: [10, 20, 30].slice(0, Math.min(3, player.incomeLevel)) };
        },
        valid(move, available, engine, player) {
          const loanOK = available.loans.includes(move.loan);
          const cardOK = player.cards.some(card => (card.city === move.card.city || card.industry === move.card.industry));

          return loanOK && cardOK;
        },
        exec(engine, player, data) {
          engine.moveTakeLoan(player, data);
        }
      },
      [MoveName.Development]: {
        available(engine: Engine, player: Player) {
          const discard: IndustryName[] = [];
          const ironSpaces = engine.board.ironSpaces();

          // no iron in board and no money to pay for it
          if (ironSpaces.length === 0 && player.money < engine.board.marketCost("iron")) {
            return false;
          }

          for (const industryDeck of player.industries.values()) {
            if (industryDeck.length) {
              discard.push(industryDeck[0]);
            }
          }

          // no industry to upgrade
          if (!discard.length) {
            return false;
          }

          return { discard, ironFrom: ironSpaces };
        },
        valid(move, available, engine, player) {
          // check that an industry on the top
          let industryOK = false;
          player.industries.forEach(industry => {
            if (industry[0] === move.discard) {
              industryOK = true;
            }
          });
          // check iron and valid space for iron
          let ironOK = false;
          const ironSpaces = engine.board.ironSpaces();
          if (ironSpaces.length > 0) { // iron in the board
            ironOK = ironSpaces.includes(move.ironFrom ?? '');
          } else { // iron on the market
            ironOK = !move.ironFrom && player.money >= engine.board.marketCost("iron");
          }
          // check 
          return industryOK && ironOK;
        },
        exec(engine, player, data) {
          engine.moveDevelopment(player, data);
        }
      },
      [MoveName.PassDevelopment]: {
        available(engine: Engine, player: Player) {
          return player.numSubMoves === 1;
        },
        valid(move, available, engine, player) {
          return player.numSubMoves === 1;
        },
        exec(engine, player, data) {
          engine.movePassDevelopment(player, data);
        }
      }
    },
    started(engine: Engine) {
      engine.statePlayerTurn();
    }
  }
};

export type Command = BaseCommand<MoveName, CommandArguments>;

export default commands;