import { expect } from "chai";
import { Engine } from "./engine";
import { AssertionError } from "assert";
import { State, Period } from "./enums/phases";
import { MoveName } from "./enums/moves";
import IndustryType from "./enums/industries";
import { set } from "lodash";

describe("Engine", () => {
  it("should setup", () => {
    const moves = [
      "init 2 randomSeed",
    ];
    const engine = new Engine;
    engine.init(3, "test");

    expect(engine.board.cards.length).to.equal(33);
    expect(engine.players[0].cards.length).to.equal(8);
  });

  it("should loan", () => {
    const moves = [
      { name: MoveName.TakeLoan, data: { card: { city: "bolton" }, loan: 10 }}
    ];
    const engine = new Engine;
    engine.init(3, "test");
    engine.move(  "yellow", moves[0] );
    expect(engine.players[0].cards.length).to.equal(7);
    expect(engine.players[0].money).to.equal(40);

  });

  it("should not allow a 30 loan", () => {
    const moves = [
      { name: MoveName.TakeLoan, data: { card: { city: "bolton" }, loan: 30 }}
    ];
    const engine = new Engine;
    engine.init(3, "test");
    engine.players[0].incomeLevel = 2;
    engine.generateAvailableCommands();
    expect(() => engine.move(  "yellow", moves[0] )).to.throw();
  });

  it("should allow a development two submoves", () => {
    const moves = [
      { name: MoveName.Development, data: { discard: "cotton1" }},
      { name: MoveName.Development, data: { discard: "port1" }}
    ];
    const engine = new Engine;
    engine.init(3, "test");
    engine.generateAvailableCommands();
    engine.move("yellow", moves[0]);
    expect(engine.players[0].numSubMoves).to.equal(1);
    expect(engine.players[0].numMoves).to.equal(0);
    expect(engine.players[0].industries.get(IndustryType.CottonMill)!.length).to.equal(11);
    engine.move("yellow", moves[1]);
    expect(engine.players[0].numSubMoves).to.equal(2);
    expect(engine.players[0].numMoves).to.equal(1);
    expect(engine.players[0].industries?.get(IndustryType.Port)!.length).to.equal(7);
  });

  it("should allow a development with pass", () => {
    const moves = [
      { name: MoveName.Development, data: { discard: "cotton1" }},
      { name: MoveName.PassDevelopment , data:{}}
    ];
    const engine = new Engine;
    engine.init(3, "test");
    engine.generateAvailableCommands();
    engine.move("yellow", moves[0]);
    expect(engine.players[0].numSubMoves).to.equal(1);
    expect(engine.players[0].numMoves).to.equal(0);
    expect(engine.players[0].industries.get(IndustryType.CottonMill)!.length).to.equal(11);
    engine.move("yellow", moves[1]);
    expect(engine.players[0].numSubMoves).to.equal(2);
    expect(engine.players[0].numMoves).to.equal(1);
  });

  it("should not allow a development of a industry in level2", () => {
    const moves = [
      { name: MoveName.Development, data: { discard: "cotton2" }}
    ];
    const engine = new Engine;
    engine.init(3, "test");
    engine.generateAvailableCommands();
    expect(() => engine.move(  "yellow", moves[0] )).to.throw();
  });

  it("should allow a development paying with iron on board", () => {
    const moves = [
      { name: MoveName.Development, data: { discard: "cotton1", ironFrom: "bolton_1" }}
    ];
    const engine = new Engine;
    engine.init(3, "test");
    set(engine.board.spaces.get("bolton_1")!, 'resources.iron', 1);
    engine.generateAvailableCommands();
    const money = engine.players[0].money;
    engine.move(  "yellow", moves[0] );
    expect(engine.board.spaces.get("bolton_1")!.resources!.iron).to.equal(0);
    expect(engine.players[0].money).to.equal(money);
  });

  it("should not allow a development without using existing iron on board", () => {
    const moves = [
      { name: MoveName.Development, data: { discard: "cotton1" }}
    ];
    const engine = new Engine;
    engine.init(3, "test");
    set(engine.board.spaces.get("bolton_1")!, 'resources.iron', 1);
    engine.generateAvailableCommands();
    const money = engine.players[0].money;
    expect(() => engine.move(  "yellow", moves[0] )).to.throw();
  });
});
