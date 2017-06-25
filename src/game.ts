import { Move, EvaluatedMove } from './move';
import { Board, opponent } from './board';
import { Field } from './field';
import { Pawn } from './pieces';
import { extractWeight, sum, score } from './score';
import { Player } from './player';

const DEFAULT_DEPTH = 4;
const MAX_SCORE = Board.newGame().fieldsByPlayer(Player.CPU).map(extractWeight).reduce(sum); //~34.9

export const cpu = (board: Board, pruning: boolean = false, depth: number = DEFAULT_DEPTH) => {
  const evaluatedMove = pruning ? alphabeta(board, depth) : minimax(board, depth);
  return board.makeMove(evaluatedMove);
};

export const minimax = (
  board: Board,
  depth: number = DEFAULT_DEPTH,
  player: Player = Player.CPU,
  move?: Move
): EvaluatedMove => {
  const { gameOver, winner } = board;

  if (gameOver) {
    if (winner === Player.CPU) return EvaluatedMove.from(move, MAX_SCORE - depth);
    if (winner === Player.Human) return EvaluatedMove.from(move, depth - MAX_SCORE);
  }

  if (depth <= 0) {
    return EvaluatedMove.from(move, score(board, depth));
  }

  const opposingPlayer = opponent(player);
  const possibleMoves = board.possibleMoves(player);
  const evaluatedMoves = possibleMoves.map(move => {
    const newBoard = board.makeMove(move);
    const { score } = minimax(newBoard, depth - 1, opposingPlayer, move);
    return EvaluatedMove.from(move, score);
  });

  const sortedMoves = evaluatedMoves.sort(EvaluatedMove.sortBy(player));
  const [bestMove] = sortedMoves;

  return bestMove ? bestMove : EvaluatedMove.from(move, score(board, depth));
};

export const alphabeta = (
  board: Board,
  depth: number = DEFAULT_DEPTH,
  player: Player = Player.CPU,
  move?: Move,
  alpha: number = -Infinity,
  beta: number = +Infinity
): EvaluatedMove => {
  const { gameOver, winner } = board;

  if (gameOver) {
    if (winner === Player.CPU) return EvaluatedMove.from(move, MAX_SCORE - depth);
    if (winner === Player.Human) return EvaluatedMove.from(move, depth - MAX_SCORE);
  }

  if (depth <= 0) {
    return EvaluatedMove.from(move, score(board, depth));
  }

  const opposingPlayer = opponent(player);
  const possibleMoves = board.possibleMoves(player).sort(Move.sortBy(player, board));
  const maximizer = player === Player.CPU;
  const evaluatedMoves = [];
  for (const possibleMove of possibleMoves) {
    const newBoard = board.makeMove(possibleMove);
    const { score } = alphabeta(newBoard, depth - 1, opposingPlayer, possibleMove, alpha, beta);
    evaluatedMoves.push(EvaluatedMove.from(possibleMove, score));
    if (maximizer) {
      if (score > alpha) {
        alpha = score;
      }
    } else {
      if (score < beta) {
        beta = score;
      }
    }
    if (alpha >= beta) {
      break;
    }
  }

  const sortedMoves = evaluatedMoves.sort(EvaluatedMove.sortBy(player));
  const [bestMove] = sortedMoves;

  return bestMove ? bestMove : EvaluatedMove.from(move, score(board, depth));
};
