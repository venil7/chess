/// <reference path="../typings/index.d.ts" />
import Board, { Player } from '../src/board';
import Field from '../src/field';
import { Coordinates } from '../src/coordinates';
import { Knight, Pawn } from '../src/pieces/index';
import * as chai from 'chai';
const { assert, expect } = chai;

describe('Knight', () => {
  it('determines its possible move correctly, (obstacles, strikes)', () => {
    const coords = Coordinates.from(3, 3);
    const board = Board.emptyGame()
      .setAt(coords, new Knight(Player.Human))
      .setAt(coords.up().upleft(), new Pawn(Player.CPU))
      .setAt(coords.down().downright(), new Pawn(Player.Human))
    const knight = board.at(coords).piece;

    const moves = knight.possibleMoves(coords, board);
    expect(moves).to.deep.include.members([
      Coordinates.from(2, 1), Coordinates.from(4, 1),
      Coordinates.from(5, 2), Coordinates.from(5, 4),
      Coordinates.from(2, 5),
      Coordinates.from(1, 4), Coordinates.from(1, 2),
    ]);
    expect(moves.length).to.equal(7);
  });
});