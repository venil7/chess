/// <reference path="../typings/index.d.ts" />
import Board, { Player } from '../src/board';
import Game from '../src/game';
import * as chai from 'chai';
const { assert, expect } = chai;

describe('Game', () => {
  it('calculates correct score for CPU player/depth', () => {
    const board = Board.newGame();
    const player = Player.CPU;
    const score = Game.score(board, player, 0);
    expect(score).to.equal(0);
  });

  it('calculates correct score for Human player/depth', () => {
    const board = Board.newGame();
    const player = Player.Human;
    const score = Game.score(board, player, 0);
    expect(score).to.equal(0);
  });
});