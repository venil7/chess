/// <reference path="../typings/index.d.ts" />
import { Board, Player } from '../src/board';
import { Game, extractWeight } from '../src/game';
import { Coordinates } from '../src/coordinates';
import { King, Pawn } from '../src/pieces/index';
import * as chai from 'chai';
const { assert, expect } = chai;

describe('Game', () => {
  it('calculates correct score for CPU player/depth', () => {
    const board = Board.newGame();
    const score = Game.score(board, 0);
    expect(score).to.eql(0);
  });

  describe('Calculate moves', () => {
    it('determines simpe Pawn win move for CPU', () => {
      const board = Board.emptyGame()
        .setAt(Coordinates.from(0, 0), new King(Player.CPU))
        .setAt(Coordinates.from(3, 3), new King(Player.Human))
        .setAt(Coordinates.from(2, 2), new Pawn(Player.CPU));

      const { from, to } = Game.minimax(board);
      expect(from).to.eql(Coordinates.from(2, 2));
      expect(to).to.eql(Coordinates.from(3, 3));
    });

    it('determines move for CPU', () => {
      const board = Board.newGame();
      const move = Game.minimax(board);
      console.log(move);
    });
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
        .setAt(coord1, new Pawn(Player.Human)).setAt(coord2, new Pawn(Player.CPU));
      const w1 = extractWeight(board.at(Coordinates.from(3, 3)));
      const w2 = extractWeight(board.at(Coordinates.from(3, 4)));
      expect(w1).to.be.eql(w2);
    });
  });


});