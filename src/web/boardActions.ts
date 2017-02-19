import { Field } from '../field';
import { Player, Board } from '../board';
import { Move } from '../move';
import { Game } from '../game';

export const newGame = () => {
  return { type: 'NEW_GAME' };
};

export const selectField = (field: Field) => {
  return { type: 'SELECT_FIELD', field };
};

export const cpuTimeOn = () => {
  return { type: 'CPU_TIME_ON' };
};

export const replaceBoard = (board: Board) => {
  return { type: 'REPLACE_BOARD', board };
};

export const cpuMoveThunk = () => async (dispatch, getState) => {
  const { game } = getState();
  const board = await Game.cpuAsync(game.board);
  dispatch(replaceBoard(board));
};

export const movePiece = (move: Move) => {
  return { type: 'MOVE_PIECE', move };
};

export const selectFieldThunk = (field: Field) => async (dispatch, getState) => {
  const { game } = getState();
  const { selectedField, possibleMoves } = game;
  if (!!selectedField && selectedField.piece.player === Player.Human) {
    const possibleCoords = possibleMoves.map(({ to }) => to);
    if (possibleCoords.some((coord) => field.coordinates.index === coord.index)) {
      dispatch(selectField(field));
      const move = new Move(selectedField.coordinates, field.coordinates);
      dispatch(movePiece(move));
      dispatch(cpuTimeOn());
      return setTimeout(() => dispatch(cpuMoveThunk()), 1);
    }
    return dispatch(selectField(field));
  }
  return dispatch(selectField(field));
};