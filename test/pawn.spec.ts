/// <reference path="../typings/index.d.ts" />
import { Board, Player, Field, Coordinates, Pawn } from '../src/index';
import * as chai from 'chai';
const { assert, expect } = chai;

describe('Pawn', () => {
  describe('Human', () => {
    it('determines its possible move correctly, no obstacles', () => {
      const board = Board.newGame();
      const coords = Coordinates.from(1, 6);
      const frontCoords = Coordinates.from(1, 5);
      const dblFronCoords = Coordinates.from(1, 4);
      const pawn = board.at(coords).piece;
      const moves = pawn.possibleMoves(coords, board);
      expect(moves).to.eql([frontCoords, dblFronCoords]);
    });

    it('determines its possible-moves correctly, with close obstacle', () => {
      const coords = Coordinates.from(1, 6);
      const obstacleCoords = Coordinates.from(1, 5);
      const board = Board.newGame().setAt(obstacleCoords, new Pawn(Player.CPU));

      const pawn = board.at(coords).piece;
      const moves = pawn.possibleMoves(coords, board);
      expect(moves).to.eql([]);
    });

    it('determines its possible-moves correctly, with far obstacle', () => {
      const coords = Coordinates.from(1, 6);
      const obstacleCoords = Coordinates.from(1, 4);
      const board = Board.newGame().setAt(obstacleCoords, new Pawn(Player.CPU));

      const pawn = board.at(coords).piece;
      const moves = pawn.possibleMoves(coords, board);
      expect(moves).to.eql([Coordinates.from(1, 5)]);
    });

    it('determines its possible-moves correctly, with strikes', () => {
      const coords = Coordinates.from(1, 5);
      const strikeCoords = Coordinates.from(2, 4);
      const frontCoords = Coordinates.from(1, 4);
      const board = Board.emptyGame().setAt(coords, new Pawn(Player.Human));
      const clone = board.setAt(strikeCoords, new Pawn(Player.CPU));
      const pawn = clone.at(coords).piece;
      const moves = pawn.possibleMoves(coords, clone);
      expect(moves).to.eql([frontCoords, strikeCoords]);
    });
  });

  describe('CPU', () => {
    it('determines its possible move correctly, no obstacles', () => {
      const board = Board.newGame();
      const coords = Coordinates.from(1, 1);
      const frontCoords = Coordinates.from(1, 2);
      const dblFronCoords = Coordinates.from(1, 3);
      const pawn = board.at(coords).piece;
      const moves = pawn.possibleMoves(coords, board);
      expect(moves).to.eql([frontCoords, dblFronCoords]);
    });

    it('determines its possible-moves correctly, with close obstacle', () => {
      const coords = Coordinates.from(1, 1);
      const obstacleCoords = Coordinates.from(1, 2);
      const board = Board.newGame().setAt(obstacleCoords, new Pawn(Player.Human));

      const pawn = board.at(coords).piece;
      const moves = pawn.possibleMoves(coords, board);
      expect(moves).to.eql([]);
    });

    it('determines its possible-moves correctly, with far obstacle', () => {
      const coords = Coordinates.from(1, 1);
      const obstacleCoords = Coordinates.from(1, 3);
      const board = Board.newGame().setAt(obstacleCoords, new Pawn(Player.Human));

      const pawn = board.at(coords).piece;
      const moves = pawn.possibleMoves(coords, board);
      expect(moves).to.eql([Coordinates.from(1, 2)]);
    });

    it('determines its possible-moves correctly, with strikes', () => {
      const coords = Coordinates.from(1, 2);
      const strikeCoords = Coordinates.from(2, 3);
      const frontCoords = Coordinates.from(1, 3);
      const board = Board.emptyGame().setAt(coords, new Pawn(Player.CPU));
      const clone = board.setAt(strikeCoords, new Pawn(Player.Human));
      const pawn = clone.at(coords).piece;
      const moves = pawn.possibleMoves(coords, clone);
      expect(moves).to.eql([frontCoords, strikeCoords]);
    });

    it('calculates pawn weight higher the closer it gets to enemy lines', () => {
      const board = Board.newGame().setAt(Coordinates.from(0, 2), new Pawn(Player.CPU));
      const field1 = board.at(Coordinates.from(0, 1));
      const field2 = board.at(Coordinates.from(0, 2));
      const { piece: piece1, coordinates: coordinates1 } = field1;
      const { piece: piece2, coordinates: coordinates2 } = field2;
      const weight1 = (<Pawn>piece1).weight(coordinates1);
      const weight2 = (<Pawn>piece2).weight(coordinates2);
      expect(weight1 < weight2).to.eq(true);
    });
  });
});
