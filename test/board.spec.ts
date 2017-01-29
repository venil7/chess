/// <reference path="../typings/index.d.ts" />
import Board from '../src/board';
import Field from '../src/field';
import { Coordinates } from '../src/coordinates';
import { Rook,Pawn } from '../src/pieces/index';
import { Color } from '../src/pieces/piece';
import * as chai from 'chai';
const {assert, expect} = chai;

describe('Chess board', () => {
  it('prints correctlty, when new', () => {
    const board = Board.newGame();
    console.log(board.toString());
    expect(board).to.have.property('fields').with.lengthOf(8);
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
});