import { Board } from '../../build';

const initState = () => {
  return {
    board: Board.newGame(),
    selectedField: null,
    possibleMoves: [],
    thinking: false,
    settings: {
      pruning: true,
      depth: 3
    }
  };
};

const boardReducer = (state = initState(), action) => {
  switch (action.type) {
    case 'NEW_GAME': {
      return initState();
    }
    case 'MOVE_PIECE': {
      const move = action.move;
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
        thinking: false,
        settings: state.settings
      };
    }
    case 'SET_SETTINGS': {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.settings
        }
      };
    }
    case 'SELECT_FIELD': {
      const field = action.field;
      return {
        ...state,
        selectedField: field.isEmpty ? null : field,
        possibleMoves: field.isEmpty ? [] : field.possibleMoves(state.board)
      };
    }
    default:
      return state;
  }
};

export default boardReducer;
