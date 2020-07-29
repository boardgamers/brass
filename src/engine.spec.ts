import { expect } from "chai";
import { Engine } from "./engine";
import { AssertionError } from "assert";
import { State, Period } from "./enums/phases";
import { MoveName } from "./enums/moves";

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
});
