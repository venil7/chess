/// <reference path="../typings/index.d.ts" />
import Board from '../src/board';
import Field from '../src/field';
import { Coordinates } from '../src/coordinates';
import { Rook, Color } from '../src/pieces/index';
import * as chai from 'chai';
const { assert, expect } = chai;

describe('Rook', () => {
  describe('White', () => {
    it('determines its possible move correctly, (obstacles, strikes)', () => {
      const coords = Coordinates.from(3, 3);
      const board = Board.newGame().setAt(coords, new Rook(Color.white));
      const rook = board.at(coords).piece;

      const moves = rook.possibleMoves(coords, board);
      expect(moves).to.deep.include.members([
        Coordinates.from(3, 2), Coordinates.from(3, 1), //north, strike
        Coordinates.from(3, 4), Coordinates.from(3, 5), //south
        Coordinates.from(4, 3), Coordinates.from(5, 3), //east
        Coordinates.from(6, 3), Coordinates.from(7, 3), //east
        Coordinates.from(0, 3), Coordinates.from(1, 3), //west
        Coordinates.from(2, 3) //west
      ]);
    });
  });

  describe('Black', () => {
    it('determines its possible move correctly, (obstacles, strikes)', () => {
      const coords = Coordinates.from(3, 3);
      const board = Board.newGame().setAt(coords, new Rook(Color.black));
      const rook = board.at(coords).piece;

      const moves = rook.possibleMoves(coords, board);
      expect(moves).to.deep.include.members([
        Coordinates.from(3, 2), //north
        Coordinates.from(3, 4), Coordinates.from(3, 5), //south
        Coordinates.from(3, 6), //south, strike
        Coordinates.from(4, 3), Coordinates.from(5, 3), //east
        Coordinates.from(6, 3), Coordinates.from(7, 3), //east
        Coordinates.from(0, 3), Coordinates.from(1, 3), //west
        Coordinates.from(2, 3) //west
      ]);
    });
  });
});