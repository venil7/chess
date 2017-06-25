/// <reference path="../typings/index.d.ts" />
import { Board, Player, extractWeight, score, Coordinates, King, Pawn } from '../src/index';
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

      const board = Board.newGame().setAt(coord1, new Pawn(Player.Human)).setAt(coord2, new Pawn(Player.CPU));
      const w1 = extractWeight(board.at(Coordinates.from(3, 3)));
      const w2 = extractWeight(board.at(Coordinates.from(3, 4)));
      expect(w1).to.be.eql(w2);
    });
  });
});
