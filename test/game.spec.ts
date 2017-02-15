/// <reference path="../typings/index.d.ts" />
import Board, { Player } from '../src/board';
import Game from '../src/game';
import { Coordinates } from '../src/coordinates';
import { King, Pawn } from '../src/pieces/index';
import * as chai from 'chai';
const { assert, expect } = chai;

describe('Game', () => {
  it('calculates correct score for CPU player/depth', () => {
    const board = Board.newGame();
    const player = Player.CPU;
    const score = Game.score(board, player, 0);
    expect(score).to.eql(0);
  });

  it('calculates correct score for Human player/depth', () => {
    const board = Board.newGame();
    const player = Player.Human;
    const score = Game.score(board, player, 0);
    expect(score).to.eql(0);
  });

  it('determines simpe Pawn win move for CPU', () => {
    const board = Board.emptyGame()
      .setAt(Coordinates.from(0, 0), new King(Player.CPU))
      .setAt(Coordinates.from(3, 3), new King(Player.Human))
      .setAt(Coordinates.from(2, 2), new Pawn(Player.CPU));

    const { from, to } = Game.minimax(board);
    expect(from).to.eql(Coordinates.from(2, 2));
    expect(to).to.eql(Coordinates.from(3, 3));
  });

  // it.only('determines move for CPU', (done) => {
  //   const board = Board.newGame();
  //   const { from, to } = Game.minimax(board);
  //   done();
  // });


});