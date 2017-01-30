/// <reference path="../typings/index.d.ts" />
import Board from '../src/board';
import Field from '../src/field';
import { Coordinates } from '../src/coordinates';
import { Pawn } from '../src/pieces/index';
import { Color } from '../src/pieces/piece';
import * as chai from 'chai';
const {assert, expect} = chai;

describe('Pawn', () => {

  describe('White', () => {

    it('determines its possible move correctly, no obstacles', () => {
      const board = Board.newGame();
      const coords = Coordinates.from(1, 6);
      const pawn = board.at(coords).piece;
      const moves = pawn.possibleMoves(coords, board);
      expect(moves).to.eql([Coordinates.from(1, 5)]);
    });

    // it('determines its possible move correctly, with obstacles', () => {
    //   const fields = [
    //     Board.emptyRow(),
    //     Board.emptyRow(),
    //     Board.emptyRow(),
    //     Board.emptyRow(),
    //     Board.emptyRow(),
    //     Board.emptyRow(),
    //     Board.pawnRow(Color.white)
    //   ]
    //   const board = new Board();
    //   const coords = Coordinates.from(1, 6);
    //   board.at(Coordinates.from(1, 5)).piece = {};
    //   const pawn = board.at(coords).piece;
    //   const moves = pawn.possibleMoves(coords, board);
    //   expect(moves).to.eql([Coordinates.from(1, 5)]);
    // });

  });

  describe('Black', () => {

    it('determines its possible move correctly, no obstacle', () => {
      const board = Board.newGame();
      const coords = Coordinates.from(1, 1);
      const pawn = board.at(coords).piece;
      const moves = pawn.possibleMoves(coords, board);
      expect(moves).to.eql([Coordinates.from(1, 2)]);
    });

  });

});