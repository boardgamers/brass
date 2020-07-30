import { expect } from "chai";
import { Engine } from "./engine";
import { AssertionError } from "assert";
import { State, Period } from "./enums/phases";
import { MoveName } from "./enums/moves";
import Board from "./board";

describe("Board", () => {
  it("should create an empty networks", () => {

    const board = new Board();
    board.init(4, () => 0);
    board.refreshNetworks();
    // 25 cities but three ports connected = 1 network
    expect(board.networks.length).to.equal(23);
    board.map.links[0].player = 0;
    board.refreshNetworks();
    expect(board.networks.length).to.equal(22);

  });



});
