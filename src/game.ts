import Move, { EvaluatedMove, sortFunc } from './move';
import Board, { Player, opponent } from './board';
import Field from './field';

const MAX_DEPTH = 3;
const MAX_SCORE = 35;

export default class Game {

  public static score(board: Board, player: Player, depth: number): number {
    const extractWeight = (field: Field) => field.piece.weight;
    const sum = (acc, i) => acc + i;
    const playerScore = board.fieldsByPlayer(player).map(extractWeight).reduce(sum);
    const opponentScore = board.fieldsByPlayer(opponent(player)).map(extractWeight).reduce(sum);
    return (playerScore - opponentScore) - depth;
  }

  public static cpu(board: Board) {
    const evaluatedMove = this.minimax(board, Player.CPU)
    return board.makeMove(evaluatedMove);
  }

  public static minimax(board: Board, player: Player = Player.CPU, move?: Move, depth: number = 0): EvaluatedMove {
    const { gameOver, winner } = board;

    if (gameOver) {
      if (winner === Player.CPU) return EvaluatedMove.from(move, MAX_SCORE - depth);
      if (winner === Player.Human) return EvaluatedMove.from(move, depth - MAX_SCORE);
    }

    if (depth >= MAX_DEPTH) {
      return EvaluatedMove.from(move, this.score(board, player, depth));
    }

    const opposingPlayer = opponent(player);
    const [firstMove] = board.possibleMoves(player)
      .map((move) => {
        const newBoard = board.makeMove(move);
        return this.minimax(newBoard, opposingPlayer, move, (depth + 1));
      })
      .sort(sortFunc(player));

    return firstMove
      ? firstMove
      : EvaluatedMove.from(move, this.score(board, player, depth));
  }

}