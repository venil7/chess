/// <reference path="../typings/index.d.ts" />
import { Board, Player } from '../src/board';
import { Field } from '../src/field';
import { Move } from '../src/move';
import { Coordinates } from '../src/coordinates';
import { Rook, Pawn, King } from '../src/pieces/index';
import * as chai from 'chai';
const { assert, expect } = chai;

describe('Chess board', () => {
  it('prints correctlty, when new', () => {
    const board = Board.newGame();
    // console.log(board.toString());
  });

  it('gets correct field [Rook@0,0] by coordinates', () => {
    const board = Board.newGame();
    const field = board.at(Coordinates.from(0, 0));
    expect(field.isEmpty).to.eql(false);
    expect(field.piece).to.eql(new Rook(Player.CPU));
  });

  it('gets correct field [Pawn@1,6] by coordinates', () => {
    const board = Board.newGame();
    const field = board.at(Coordinates.from(0, 6));
    expect(field.isEmpty).to.eql(false);
    expect(field.piece).to.eql(new Pawn(Player.Human));
  });

  it('gets correct field [empty] by coordinates', () => {
    const board = Board.newGame();
    const field = board.at(Coordinates.from(5, 5));
    expect(field.isEmpty).to.eql(true);
  });

  it('gets cloned correctly', () => {
    const board = Board.newGame();
    const clone = board.clone();
    expect(board).to.eql(clone);
    expect(board).to.not.eq(clone);
  });

  it('sets the piece correctly, in non mutative way', () => {
    const board = Board.emptyGame();
    const clone = board.setAt(Coordinates.from(2, 2), new Rook(Player.Human));
    expect(board.at(Coordinates.from(2, 2)).piece).to.eql(null);
    expect(clone.at(Coordinates.from(2, 2)).piece).to.eql(new Rook(Player.Human));
  });

  it('calculates current possible moves for Human', () => {
    const board = Board.newGame();
    const possibleMoves = board.possibleMoves(Player.Human);
    expect(possibleMoves).to.deep.include.members([
      //pawns close
      new Move(Coordinates.from(0, 6), Coordinates.from(0, 4)),
      new Move(Coordinates.from(1, 6), Coordinates.from(1, 4)),
      new Move(Coordinates.from(2, 6), Coordinates.from(2, 4)),
      new Move(Coordinates.from(3, 6), Coordinates.from(3, 4)),
      new Move(Coordinates.from(4, 6), Coordinates.from(4, 4)),
      new Move(Coordinates.from(5, 6), Coordinates.from(5, 4)),
      new Move(Coordinates.from(6, 6), Coordinates.from(6, 4)),
      new Move(Coordinates.from(7, 6), Coordinates.from(7, 4)),
      //pawns far
      new Move(Coordinates.from(0, 6), Coordinates.from(0, 5)),
      new Move(Coordinates.from(1, 6), Coordinates.from(1, 5)),
      new Move(Coordinates.from(2, 6), Coordinates.from(2, 5)),
      new Move(Coordinates.from(3, 6), Coordinates.from(3, 5)),
      new Move(Coordinates.from(4, 6), Coordinates.from(4, 5)),
      new Move(Coordinates.from(5, 6), Coordinates.from(5, 5)),
      new Move(Coordinates.from(6, 6), Coordinates.from(6, 5)),
      new Move(Coordinates.from(7, 6), Coordinates.from(7, 5)),
      //knights
      new Move(Coordinates.from(1, 7), Coordinates.from(0, 5)),
      new Move(Coordinates.from(1, 7), Coordinates.from(2, 5)),
      new Move(Coordinates.from(6, 7), Coordinates.from(5, 5)),
      new Move(Coordinates.from(6, 7), Coordinates.from(7, 5)),
    ]);
    expect(possibleMoves.length).to.eql(20);
  });

  it('calculates current possible moves for CPU', () => {
    const board = Board.newGame();
    const possibleMoves = board.possibleMoves(Player.CPU);
    expect(possibleMoves).to.deep.include.members([
      //pawns close
      new Move(Coordinates.from(0, 1), Coordinates.from(0, 2)),
      new Move(Coordinates.from(1, 1), Coordinates.from(1, 2)),
      new Move(Coordinates.from(2, 1), Coordinates.from(2, 2)),
      new Move(Coordinates.from(3, 1), Coordinates.from(3, 2)),
      new Move(Coordinates.from(4, 1), Coordinates.from(4, 2)),
      new Move(Coordinates.from(5, 1), Coordinates.from(5, 2)),
      new Move(Coordinates.from(6, 1), Coordinates.from(6, 2)),
      new Move(Coordinates.from(7, 1), Coordinates.from(7, 2)),
      //pawns far
      new Move(Coordinates.from(0, 1), Coordinates.from(0, 3)),
      new Move(Coordinates.from(1, 1), Coordinates.from(1, 3)),
      new Move(Coordinates.from(2, 1), Coordinates.from(2, 3)),
      new Move(Coordinates.from(3, 1), Coordinates.from(3, 3)),
      new Move(Coordinates.from(4, 1), Coordinates.from(4, 3)),
      new Move(Coordinates.from(5, 1), Coordinates.from(5, 3)),
      new Move(Coordinates.from(6, 1), Coordinates.from(6, 3)),
      new Move(Coordinates.from(7, 1), Coordinates.from(7, 3)),
      //knights
      new Move(Coordinates.from(1, 0), Coordinates.from(0, 2)),
      new Move(Coordinates.from(1, 0), Coordinates.from(2, 2)),
      new Move(Coordinates.from(6, 0), Coordinates.from(5, 2)),
      new Move(Coordinates.from(6, 0), Coordinates.from(7, 2)),
    ]);
    expect(possibleMoves.length).to.eql(20);
  });

  it('Moves piece properly from field to field', () => {
    const from = Coordinates.from(3, 3);
    const to = Coordinates.from(3, 2);
    const piece = new Pawn(Player.Human);
    const board = Board.emptyGame().setAt(from, piece);
    const move = new Move(from, to);
    const newBoard = board.makeMove(move);
    expect(newBoard.at(from).isEmpty).to.eql(true);
    expect(newBoard.at(to).piece).to.eql(piece);
  });

  it('Determines game is not over', () => {
    const board = Board.newGame();
    expect(board.gameOver).to.eql(false);
  });

  it('Determines game is over', () => {
    const board = Board.emptyGame().setAt(Coordinates.from(1, 1), new King(Player.CPU));
    expect(board.gameOver).to.eql(true);
  });

  it('Serializes/deserializes from JSON and is equal', () => {
    const board = Board.newGame();
    const json = board.toJSON();
    const clone = Board.fromJSON(json);
    expect(board).to.eql(clone);
  });

});