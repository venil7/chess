/// <reference path="../typings/index.d.ts" />
import Board from '../src/board';
import Field from '../src/field';
import { Coordinates } from '../src/coordinates';
import { Rook, Pawn, Color } from '../src/pieces/index';
import * as chai from 'chai';
const {assert, expect} = chai;

describe('Chess board', () => {
  it('prints correctlty, when new', () => {
    const board = Board.newGame();
    console.log(board.toString());
  });

  it('gets correct field [Rook@0,0] by coordinates', () => {
    const board = Board.newGame();
    const field = board.at(Coordinates.from(0, 0));
    expect(field.isEmpty).to.eql(false);
    expect(field.piece).to.eql(new Rook(Color.black));
  });

  it('gets correct field [Pawn@1,6] by coordinates', () => {
    const board = Board.newGame();
    const field = board.at(Coordinates.from(0, 6));
    expect(field.isEmpty).to.eql(false);
    expect(field.piece).to.eql(new Pawn(Color.white));
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
    const clone = board.setAt(Coordinates.from(2, 2), new Rook(Color.white));
    expect(board.at(Coordinates.from(2, 2)).piece).to.eql(null);
    expect(clone.at(Coordinates.from(2, 2)).piece).to.eql(new Rook(Color.white));
  })

});