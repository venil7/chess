/// <reference path="../typings/index.d.ts" />
import { Board, Player } from '../src/board';
import { Field } from '../src/field';
import { Coordinates } from '../src/coordinates';
import { Pawn } from '../src/pieces/index';
import * as chai from 'chai';
const { assert, expect } = chai;

describe('Pawn', () => {

  describe('Human', () => {

    it('determines its possible move correctly, no obstacles', () => {
      const board = Board.newGame();
      const coords = Coordinates.from(1, 6);
      const frontCoords = Coordinates.from(1, 5);
      const pawn = board.at(coords).piece;
      const moves = pawn.possibleMoves(coords, board);
      expect(moves).to.eql([frontCoords]);
    });

    it('determines its possible-moves correctly, with obstacles', () => {
      const coords = Coordinates.from(1, 5);
      const obstacleCoords = Coordinates.from(1, 4);
      const board = Board.emptyGame().setAt(coords, new Pawn(Player.Human));
      const clone = board.setAt(obstacleCoords, new Pawn(Player.CPU));

      const pawn = clone.at(coords).piece;
      const moves = pawn.possibleMoves(coords, clone);
      expect(moves).to.eql([]);
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

    it('determines its possible move correctly, no obstacle', () => {
      const board = Board.newGame();
      const coords = Coordinates.from(1, 1);
      const frontCoords = Coordinates.from(1, 2)
      const pawn = board.at(coords).piece;
      const moves = pawn.possibleMoves(coords, board);
      expect(moves).to.eql([frontCoords]);
    });

    it('determines its possible-moves correctly, with obstacles', () => {
      const coords = Coordinates.from(1, 1);
      const obstacleCoords = Coordinates.from(1, 2);
      const board = Board.emptyGame().setAt(coords, new Pawn(Player.CPU));
      const clone = board.setAt(obstacleCoords, new Pawn(Player.Human));

      const pawn = clone.at(coords).piece;
      const moves = pawn.possibleMoves(coords, clone);
      expect(moves).to.eql([]);
    });

    it('determines its possible-moves correctly, with strikes', () => {
      const coords = Coordinates.from(1, 1);
      const strikeCoords = Coordinates.from(2, 2);
      const frontCoords = Coordinates.from(1, 2)
      const board = Board.emptyGame().setAt(coords, new Pawn(Player.CPU));
      const clone = board.setAt(strikeCoords, new Pawn(Player.Human));
      const pawn = clone.at(coords).piece;
      const moves = pawn.possibleMoves(coords, clone);
      expect(moves).to.eql([frontCoords, strikeCoords]);
    });

  });

});