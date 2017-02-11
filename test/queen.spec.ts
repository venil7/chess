/// <reference path="../typings/index.d.ts" />
import Board from '../src/board';
import Field from '../src/field';
import { Coordinates } from '../src/coordinates';
import { Queen, Color } from '../src/pieces/index';
import * as chai from 'chai';
const { assert, expect } = chai;

describe('Queen', () => {
  describe('White', () => {
    it('determines its possible move correctly, (obstacles, strikes)', () => {
      const coords = Coordinates.from(3, 3);
      const board = Board.newGame().setAt(coords, new Queen(Color.white));
      const queen = board.at(coords).piece;

      const moves = queen.possibleMoves(coords, board);
      expect(moves).to.deep.include.members([
        Coordinates.from(3, 2), Coordinates.from(3, 1), //up, strike
        Coordinates.from(4, 2), Coordinates.from(5, 1), //up-right, strike
        Coordinates.from(4, 3), Coordinates.from(5, 3), //right
        Coordinates.from(6, 3), Coordinates.from(7, 3), //right
        Coordinates.from(4, 4), Coordinates.from(5, 5), //down-right
        Coordinates.from(3, 4), Coordinates.from(3, 5), //down
        Coordinates.from(2, 4), Coordinates.from(1, 5), //down-left
        Coordinates.from(0, 3), Coordinates.from(1, 3), //left
        Coordinates.from(2, 3), //left
        Coordinates.from(2, 2), Coordinates.from(1, 1), //up-left, strike
      ]);
      expect(moves.length).to.equal(19);
    });
  });

  describe('Black', () => {
    it('determines its possible move correctly, (obstacles, strikes)', () => {
      const coords = Coordinates.from(3, 3);
      const board = Board.newGame().setAt(coords, new Queen(Color.black));
      const queen = board.at(coords).piece;

      const moves = queen.possibleMoves(coords, board);
      expect(moves).to.deep.include.members([
        Coordinates.from(3, 2), //up
        Coordinates.from(4, 2), //up-right
        Coordinates.from(4, 3), Coordinates.from(5, 3), //right
        Coordinates.from(6, 3), Coordinates.from(7, 3), //right
        Coordinates.from(4, 4), Coordinates.from(5, 5), //down-right
        Coordinates.from(6, 6),//down-right, strike
        Coordinates.from(3, 4), Coordinates.from(3, 5), //down
        Coordinates.from(3, 6), //down, strike
        Coordinates.from(2, 4), Coordinates.from(1, 5), //down-left
        Coordinates.from(0, 6), //down-left, strike
        Coordinates.from(0, 3), Coordinates.from(1, 3), //left
        Coordinates.from(2, 3), //left
        Coordinates.from(2, 2), //up-left
      ]);
      expect(moves.length).to.equal(19);
    });
  });
});