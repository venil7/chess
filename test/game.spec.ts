/// <reference path="../typings/index.d.ts" />
import { Board, Player } from '../src/board';
import { cpu, minimax, alphabeta } from '../src/game';
import { Coordinates } from '../src/coordinates';
import { King, Pawn } from '../src/pieces/index';
import * as chai from 'chai';
const { assert, expect } = chai;

describe('Game', () => {
  describe('Calculate moves', () => {
    it('determines simpe Pawn win move for CPU', () => {
      const board = Board.emptyGame()
        .setAt(Coordinates.from(0, 0), new King(Player.CPU))
        .setAt(Coordinates.from(3, 3), new King(Player.Human))
        .setAt(Coordinates.from(2, 2), new Pawn(Player.CPU));

      const { from, to } = minimax(board, 2);
      expect(from).to.eql(Coordinates.from(2, 2));
      expect(to).to.eql(Coordinates.from(3, 3));
    });

    it('determines simpe Pawn win move for CPU (alpha-betta)', () => {
      const board = Board.emptyGame()
        .setAt(Coordinates.from(0, 0), new King(Player.CPU))
        .setAt(Coordinates.from(3, 3), new King(Player.Human))
        .setAt(Coordinates.from(2, 2), new Pawn(Player.CPU));

      const { from, to, score } = alphabeta(board, 2);

      expect(from).to.eql(Coordinates.from(2, 2));
      expect(to).to.eql(Coordinates.from(3, 3));
    });

    it('determines move for CPU', () => {
      const board = Board.newGame();
      const move = minimax(board, 2);
      console.log(move);
    });

    it('determines move for CPU (alpha-beta)', () => {
      const board = Board.newGame();
      const move = alphabeta(board, 2);
      console.log(move);
    });
  });
});
