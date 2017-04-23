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
  thinking: boolean;
}

const initState = (): BoardState => {
  return {
    board: Board.newGame(),
    selectedField: null,
    possibleMoves: [],
    thinking: false,
  };
};

export const boardReducer = (state: BoardState = initState(), action: Action): BoardState => {
  switch (action.type) {
    case 'NEW_GAME': {
      return initState();
    }
    case 'MOVE_PIECE': {
      const move: Move = action.move;
      const board = state.board.makeMove(move);
      return {
        ...state,
        board,
        selectedField: null,
        possibleMoves: []
      };
    }
    case 'CPU_TIME_ON': {
      return {
        ...state,
        thinking: true
      };
    }
    case 'REPLACE_BOARD': {
      return {
        board: action.board,
        selectedField: null,
        possibleMoves: [],
        thinking: false
      };
    }
    case 'SELECT_FIELD': {
      const field: Field = action.field;
      return {
        ...state,
        selectedField: field.isEmpty ? null : field,
        possibleMoves: field.isEmpty ? [] : field.possibleMoves(state.board)
      };
    }
    default: return state;
  }
};