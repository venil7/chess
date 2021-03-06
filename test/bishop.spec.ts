/// <reference path="../typings/index.d.ts" />
import { Board, Player, Field, Coordinates, Bishop } from '../src/index';
import * as chai from 'chai';
const { assert, expect } = chai;

describe('Bishop', () => {
  it('determines its possible move correctly, (obstacles, strikes)', () => {
    const coords = Coordinates.from(3, 3);
    const board = Board.newGame().setAt(coords, new Bishop(Player.Human));
    const bishop = board.at(coords).piece;

    const moves = bishop.possibleMoves(coords, board);
    expect(moves).to.deep.include.members([
      Coordinates.from(2, 2),
      Coordinates.from(1, 1), //up-left, strike
      Coordinates.from(4, 2),
      Coordinates.from(5, 1), //up-right, strike
      Coordinates.from(2, 4),
      Coordinates.from(1, 5), //dowwn-left
      Coordinates.from(4, 4),
      Coordinates.from(5, 5) //down-right
    ]);
    expect(moves.length).to.eql(8);
  });

  it('determines no possible move, from init position', () => {
    const board = Board.newGame();
    const coords = Coordinates.from(5, 0);
    const bishop = board.at(coords).piece;

    const moves = bishop.possibleMoves(coords, board);
    expect(moves.length).to.eql(0);
  });
});
