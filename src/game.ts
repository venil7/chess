import { Move, EvaluatedMove, sortFunc } from './move';
import { Board, Player, opponent } from './board';
import { Field } from './field';

const MAX_DEPTH = 3;
const MAX_SCORE = 35;

export class Game {

  public static score(board: Board, depth: number): number {
    const extractWeight = (field: Field) => field.piece.weight;
    const sum = (acc, i) => acc + i;
    const cpuScore = board.fieldsByPlayer(Player.CPU).map(extractWeight).reduce(sum);
    const humanScore = board.fieldsByPlayer(Player.Human).map(extractWeight).reduce(sum);
    return (cpuScore - humanScore) - depth;
  }

  public static cpu(board: Board) {
    const evaluatedMove = this.minimax(board);
    return board.makeMove(evaluatedMove);
  }

  public static minimax(board: Board, player: Player = Player.CPU, move?: Move, depth: number = 0): EvaluatedMove {
    const { gameOver, winner } = board;

    if (gameOver) {
      if (winner === Player.CPU) return EvaluatedMove.from(move, MAX_SCORE - depth);
      if (winner === Player.Human) return EvaluatedMove.from(move, depth - MAX_SCORE);
    }

    if (depth >= MAX_DEPTH) {
      return EvaluatedMove.from(move, this.score(board, depth));
    }

    const opposingPlayer = opponent(player);
    const possibleMoves = board.possibleMoves(player);
    const evaluatedMoves = possibleMoves.map((move) => {
      const newBoard = board.makeMove(move);
      const { score } = this.minimax(newBoard, opposingPlayer, move, (depth + 1));
      return EvaluatedMove.from(move, score);
    });

    const sortedMoves = evaluatedMoves.sort(sortFunc(player));
    const [bestMove] = sortedMoves;

    return bestMove
      ? bestMove
      : EvaluatedMove.from(move, this.score(board, depth));
  }

}