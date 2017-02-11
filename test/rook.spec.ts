/// <reference path="../typings/index.d.ts" />
import Board from '../src/board';
import Field from '../src/field';
import { Coordinates } from '../src/coordinates';
import { Rook, Color } from '../src/pieces/index';
import * as chai from 'chai';
const { assert, expect } = chai;

describe('Rook', () => {
  it('determines its possible move correctly, (obstacles, strikes)', () => {
    const coords = Coordinates.from(3, 3);
    const board = Board.newGame()
      .setAt(coords, new Rook(Color.white));
    const rook = board.at(coords).piece;

    const moves = rook.possibleMoves(coords, board);
    expect(moves).to.deep.include.members([
      Coordinates.from(3, 2), Coordinates.from(3, 1), //up, strike
      Coordinates.from(3, 4), Coordinates.from(3, 5), //down
      Coordinates.from(4, 3), Coordinates.from(5, 3), //right
      Coordinates.from(6, 3), Coordinates.from(7, 3), //right
      Coordinates.from(0, 3), Coordinates.from(1, 3), //left
      Coordinates.from(2, 3) //left
    ]);
    expect(moves.length).to.equal(11);
  });
});