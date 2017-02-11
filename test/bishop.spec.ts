/// <reference path="../typings/index.d.ts" />
import Board from '../src/board';
import Field from '../src/field';
import { Coordinates } from '../src/coordinates';
import { Bishop, Color } from '../src/pieces/index';
import * as chai from 'chai';
const { assert, expect } = chai;

describe('Bishop', () => {
  describe('White', () => {
    it('determines its possible move correctly, (obstacles, strikes)', () => {
      const coords = Coordinates.from(3, 3);
      const board = Board.newGame().setAt(coords, new Bishop(Color.white));
      const bishop = board.at(coords).piece;

      const moves = bishop.possibleMoves(coords, board);
      expect(moves).to.deep.include.members([
        Coordinates.from(2, 2), Coordinates.from(1, 1), //up-left, strike
        Coordinates.from(4, 2), Coordinates.from(5, 1), //up-right, strike
        Coordinates.from(2, 4), Coordinates.from(1, 5), //dowwn-left
        Coordinates.from(4, 4), Coordinates.from(5, 5), //down-right
      ]);
      expect(moves.length).to.equal(8);
    });
  });

  describe('Black', () => {
    it('determines its possible move correctly, (obstacles, strikes)', () => {
      const coords = Coordinates.from(3, 3);
      const board = Board.newGame().setAt(coords, new Bishop(Color.black));
      const bishop = board.at(coords).piece;

      const moves = bishop.possibleMoves(coords, board);
      expect(moves).to.deep.include.members([
        Coordinates.from(2, 2), //up-left
        Coordinates.from(4, 2), //up-right
        Coordinates.from(2, 4), Coordinates.from(1, 5), Coordinates.from(0, 6), //dowwn-left, strike
        Coordinates.from(4, 4), Coordinates.from(5, 5), Coordinates.from(6, 6)//down-right, strike
      ]);
      expect(moves.length).to.equal(8);
    });
  });
});