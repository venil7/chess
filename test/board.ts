/// <reference path="../typings/index.d.ts" />
import Board from '../src/board';

describe('Chess board', () => {
  it('prints correctlty, when new', () => {

    const board = Board.newGame();
    console.log(board.toString());

  });
});