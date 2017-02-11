/// <reference path="../typings/index.d.ts" />
import Board from '../src/board';
import Field from '../src/field';
import { Coordinates } from '../src/coordinates';
import { King, Pawn, Color } from '../src/pieces/index';
import * as chai from 'chai';
const { assert, expect } = chai;

describe('King', () => {
  it('determines its possible move correctly, (obstacles, strikes)', () => {
    const coords = Coordinates.from(3, 3);
    const board = Board.newGame()
      .setAt(coords, new King(Color.white))
      .setAt(coords.upleft(), new Pawn(Color.black))
      .setAt(coords.downright(), new Pawn(Color.white))
    const king = board.at(coords).piece;

    const moves = king.possibleMoves(coords, board);
    expect(moves).to.deep.include.members([
      Coordinates.from(3, 2), //up
      Coordinates.from(4, 2), //up-right
      Coordinates.from(4, 3), //right
      // no (4,4)
      Coordinates.from(3, 4), //down
      Coordinates.from(2, 4), //down-left
      Coordinates.from(2, 3), //left
      Coordinates.from(2, 2), //up-left
    ]);
    expect(moves.length).to.equal(7);
  });
});