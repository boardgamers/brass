import { expect } from "chai";
import { Engine } from "./engine";
import { AssertionError } from "assert";
import { State, Period } from "./enums/phases";
import { MoveName } from "./enums/moves";
import { Player } from "./player";

describe("Player", () => {
  it("should reduce loan", () => {

    const player = new Player("blue",0);
    player.income=0;
    player.incomeLevel=10;
    player.reduceIncome(30);
    expect(player.incomeLevel).to.equal(7);
    player.income=12;
    player.incomeLevel=36;
    player.reduceIncome(30);
    expect(player.incomeLevel).to.equal(28);
    expect(player.income).to.equal(9);
  });

 

});
