import { Board, Player } from '../board';
import { Field } from '../field';
import { Move } from '../move';
import { Game } from '../game';

interface Action {
  type: string,
  [index: string]: any
}

interface BoardState {
  board: Board;
  selectedField: Field;
  possibleMoves: Move[];
}

const initState = (): BoardState => {
  return {
    board: Board.newGame(),
    selectedField: null,
    possibleMoves: []
  };
};

export const boardReducer = (state: BoardState = initState(), action: Action): BoardState => {
  switch (action.type) {
    case 'NEW_GAME': {
      return initState();
    }
    case 'SELECT_FIELD': {
      const field: Field = action.field;
      const { selectedField } = state;
      if (selectedField && selectedField.piece.player === Player.Human) {
        const { possibleMoves } = state;
        const possibleCoords = possibleMoves.map(({ from, to }) => to);
        if (possibleCoords.some(coord => field.coordinates.index === coord.index)) {
          const move = new Move(selectedField.coordinates, action.field.coordinates);
          const board = Game.cpu(state.board.makeMove(move))
          return {
            board,
            selectedField: null,
            possibleMoves: []
          };
        }
      }
      if (!field.isEmpty) {
        return {
          ...state,
          selectedField: field,
          possibleMoves: field.possibleMoves(state.board)
        };
      } else {
        return {
          ...state,
          selectedField: null,
          possibleMoves: []
        }
      }
    }
  }
  return state;
};