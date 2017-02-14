import Move, { EvaluatedMove } from './move';
import Board, { Player, opponent } from './board';
import { Color } from './pieces/index';
import Field from './field';

const MAX_DEPTH = 4;
const MAX_SCORE = 35;

class Game {
  public static score(board: Board, depth: number): number {
    const extractWeight = (field: Field) => field.piece.weight;
    const sum = (acc, i) => acc + i;
    const blacks = board.fieldsByColor(Color.black).map(extractWeight).reduce(sum);
    const whites = board.fieldsByColor(Color.white).map(extractWeight).reduce(sum);
    return (blacks - whites) - depth;
  }

  public static minimax(board: Board, player: Player, move?: Move, depth: number = 0): EvaluatedMove {
    const { gameOver, winner } = board;
    if (gameOver) {
      if (winner === Player.CPU) return EvaluatedMove.from(move, MAX_SCORE - depth);
      if (winner === Player.Human) return EvaluatedMove.from(move, depth - MAX_SCORE);
    }

    if (depth >= MAX_DEPTH) {
      return EvaluatedMove.from(move, this.score(board, depth));
    }

    const [firstMove] = board.possibleMoves()
      .map((move) => {
        const newBoard = board.makeMove(move);
        return this.minimax(newBoard, opponent(player), move, (depth + 1));
      })
      .sort(EvaluatedMove.sortFunc(player));

    return firstMove;
  }

  public static cpu(board: Board) {
    const evaluatedMove = this.minimax(board, Player.CPU)
    return board.makeMove(evaluatedMove);
  }
}