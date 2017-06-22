import { Player, Move, cpu } from '../../build';

export const newGame = () => {
  return { type: 'NEW_GAME' };
};

export const selectField = field => {
  return { type: 'SELECT_FIELD', field };
};

export const cpuTimeOn = () => {
  return { type: 'CPU_TIME_ON' };
};

export const replaceBoard = board => {
  return { type: 'REPLACE_BOARD', board };
};

export const setSettings = settings => {
  return { type: 'SET_SETTINGS', settings };
};

export const cpuMoveThunk = () => (dispatch, getState) => {
  const { game: { settings: { pruning, depth } }, game } = getState();
  const board = cpu(game.board, pruning, depth);
  dispatch(replaceBoard(board));
};

export const movePiece = move => {
  return { type: 'MOVE_PIECE', move };
};

export const selectFieldThunk = field => (dispatch, getState) => {
  const { game } = getState();
  const { selectedField, possibleMoves } = game;
  if (!!selectedField && selectedField.piece.player === Player.Human) {
    const possibleCoords = possibleMoves.map(({ to }) => to);
    if (possibleCoords.some(coord => field.coordinates.index === coord.index)) {
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
