/// <reference path="../typings/index.d.ts" />
import { Board, Player } from '../src/board';
import * as game from '../src/game';
import { extractWeight, score } from '../src/score';
import { Coordinates } from '../src/coordinates';
import { King, Pawn } from '../src/pieces/index';
import * as chai from 'chai';
const { assert, expect } = chai;

describe('Score', () => {

  it('calculates correct score for CPU player/depth', () => {
    const board = Board.newGame();
    const result = score(board, 0);
    expect(result).to.eql(0);
  });

  describe('Extract weights', () => {
    it('weghts of 2 opposite pawns are equal (far out)', () => {
      const board = Board.newGame();
      const w1 = extractWeight(board.at(Coordinates.from(1, 1)));
      const w2 = extractWeight(board.at(Coordinates.from(1, 6)));
      expect(w1).to.be.eql(w2);
    });

    it('weghts of 2 opposite pawns are equal (cross middleline)', () => {
      const coord1 = Coordinates.from(3, 3);
      const coord2 = Coordinates.from(3, 4);

      const board = Board.newGame()
        .setAt(coord1, new Pawn(Player.Human))
        .setAt(coord2, new Pawn(Player.CPU));
      const w1 = extractWeight(board.at(Coordinates.from(3, 3)));
      const w2 = extractWeight(board.at(Coordinates.from(3, 4)));
      expect(w1).to.be.eql(w2);
    });

  });

});