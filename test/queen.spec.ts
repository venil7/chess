/// <reference path="../typings/index.d.ts" />
import { Board, Player, Field, Coordinates, Queen } from '../src/index';
import * as chai from 'chai';
const { assert, expect } = chai;

describe('Queen', () => {
  it('determines its possible move correctly, (obstacles, strikes)', () => {
    const coords = Coordinates.from(3, 3);
    const board = Board.newGame().setAt(coords, new Queen(Player.Human));
    const queen = board.at(coords).piece;

    const moves = queen.possibleMoves(coords, board);
    expect(moves).to.deep.include.members([
      Coordinates.from(3, 2),
      Coordinates.from(3, 1), //up, strike
      Coordinates.from(4, 2),
      Coordinates.from(5, 1), //up-right, strike
      Coordinates.from(4, 3),
      Coordinates.from(5, 3), //right
      Coordinates.from(6, 3),
      Coordinates.from(7, 3), //right
      Coordinates.from(4, 4),
      Coordinates.from(5, 5), //down-right
      Coordinates.from(3, 4),
      Coordinates.from(3, 5), //down
      Coordinates.from(2, 4),
      Coordinates.from(1, 5), //down-left
      Coordinates.from(0, 3),
      Coordinates.from(1, 3), //left
      Coordinates.from(2, 3), //left
      Coordinates.from(2, 2),
      Coordinates.from(1, 1) //up-left, strike
    ]);
    expect(moves.length).to.eql(19);
  });

  it('determines no possible move, from init position', () => {
    const board = Board.newGame();
    const coords = Coordinates.from(3, 0);
    const queen = board.at(coords).piece;

    const moves = queen.possibleMoves(coords, board);
    expect(moves.length).to.eql(0);
  });
});
