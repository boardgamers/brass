import { memoize } from "./memoize";
import seedrandom from "seedrandom";
import assert from "assert";
import { asserts } from './index';
import { BaseCommandData, AvailableCommand, CommandStruct, MoveNameWithData, MoveNameWithoutData, Command } from "./commands";

export default abstract class BaseEngine<
  Player,
  State extends string = string,
  MoveName extends string = string,
  GameEventName extends string = string,
  PlayerId = number,
  LogItem extends {kind: "event", event: {name: GameEventName}} | {kind: "move", move: {name: MoveName}, player: PlayerId} = {kind: "event", event: {name: GameEventName}} | {kind: "move", move: {name: MoveName}, player: PlayerId},
  AvailableCommandData extends BaseCommandData<MoveName> = BaseCommandData<MoveName>,
  CommandData extends BaseCommandData<MoveName> = BaseCommandData<MoveName>> {

  players: Player[];
  round = 0;
  log: LogItem[] = [];
  availableCommands?: AvailableCommand<MoveName, AvailableCommandData, PlayerId>[];
  ended = false;
  #rng?: seedrandom.prng;
  #seed = "";
  #currentPlayer: PlayerId;
  #state: State;
  #replaying = false;

  addLog(item: LogItem) {
    if (!this.#replaying) {
      this.log.push(item);
    }
  }

  abstract commands(): CommandStruct<State, MoveName, Player, this, AvailableCommandData, CommandData>;

  generateAvailableCommands() {
    const functions = this.commands()[this.state]!.moves!;

    const availableCommands: AvailableCommand<MoveName, AvailableCommandData, PlayerId>[] = [];

    for (const [move, obj] of Object.entries(functions)) {
      if (!obj) {
        continue;
      }

      asserts<NonNullable<NonNullable<NonNullable<(ReturnType<this["commands"]>)[State]>["moves"]>[MoveName]>>(obj);
      asserts<MoveName>(move);

      if (!obj.available) {
        availableCommands.push({move, player: this.currentPlayer} as AvailableCommand<MoveName, AvailableCommandData, PlayerId>);
        continue;
      }

      const availTest = obj.available!(this, this.player(this.currentPlayer));

      if (availTest) {
        if (availTest === true) {
          asserts<MoveNameWithoutData<MoveName, AvailableCommandData>>(move);
          availableCommands.push({move, player: this.currentPlayer} as unknown as AvailableCommand<MoveName, AvailableCommandData, PlayerId>);
        } else {
          asserts<MoveNameWithData<MoveName, AvailableCommandData>>(move);
          if (Array.isArray(availTest)) {
            availableCommands.push(...availTest.map((x: AvailableCommandData[typeof move]) => ({data: x, move, player: this.currentPlayer})));
          } else {
            availableCommands.push({data: availTest, move, player: this.currentPlayer} as unknown as AvailableCommand<typeof move, AvailableCommandData, PlayerId>);
          }
        }
      }
    }

    this.availableCommands = availableCommands;
  }

  move(player: PlayerId, move: Command<MoveName, CommandData>) {
    let avail = this.availableCommands?.filter(av => av.player === player);

    assert(avail?.length ?? 0 > 0, `It's not the turn of player ${player}`);

    avail = avail?.filter(av => av.move === move.name, `Player ${player} can't execute command ${move.name}`);

    const functions = this.commands()[this.state]!.moves![move.name]!;

    if (functions.valid && avail && !avail.some(data => functions.valid!((move as any).data, (data as any).data, this, this.player(player)))) {
      assert(false, "The command is not valid with the given arguments");
    }

    this.addLog({move, kind: "move", player} as any as LogItem);
    functions.exec?.(this, this.player(player), (move as any).data);
  }

  /**
   * Change state by executing given log item
   *
   * Useful to replay a game just from log. Ideally log items are enough to fully reproduce a game
   * @param item
   */
  abstract processLogItem(item: LogItem): void;

  replay(items: LogItem[]) {
    this.#replaying = true;

    try {
      for (const item of items) {
        this.processLogItem(item);
      }
    } finally {
      this.#replaying = false;
    }
  }

  get seed() {
    return this.#seed;
  }
  set seed(newSeed: string) {
    this.#seed = newSeed;
    this.#rng = undefined;
  }
  get rng(): seedrandom.prng {
    if (!this.#rng) {
      this.#rng = seedrandom(this.seed, {state: true});
    }
    return this.#rng;
  }

  @memoize()
  player(id: PlayerId) {
    assert(typeof id === "number", "You need to override AbstractEngine.player if you use a custom player id");
    return this.players[id];
  }

  toJSON() {
    return {
      log: this.log,
      round: this.round,
      seed: this.seed,
      rngState : this.rng.state(),
      players: this.players,
      state: this.state,
      availableCommands: this.availableCommands
    };
  }

  fromJSON(data: ReturnType<this["toJSON"]>) {
    this.log = data.log;
    this.round = data.round;
    this.seed = data.seed;
    this.#rng = seedrandom("", {state: data.rngState});
    this.players = data.players;
    this.#state = data.state;
    this.availableCommands = data.availableCommands;
  }

  get currentPlayer() {
    return this.#currentPlayer;
  }

  set currentPlayer(val: PlayerId) {
    this.#currentPlayer = val;
  }

  get state() {
    return this.#state;
  }

  set state(state: State) {
    if (this.#state ) {
      this.commands()[this.#state]?.ended?.(this);
    }
    this.#state = state;
    this.addLog({ kind: "event", event: { name: "statechange",  state: state} } as any as LogItem);
    this.commands()[state]?.started?.(this);
  }
}