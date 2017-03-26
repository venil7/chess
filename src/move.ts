import { Coordinates } from './coordinates';
import { Player, Board } from './board';
import { score } from './score';

export class Move {
  constructor(
    public from: Coordinates,
    public to: Coordinates,
  ) { }

  static sortBy(player: Player, board: Board): (m1: Move, m2: Move) => number {
    return (m1: Move, m2: Move) => {
      return player === Player.CPU
        ? score(board.makeMove(m2)) - score(board.makeMove(m1))
        : score(board.makeMove(m1)) - score(board.makeMove(m2));
    };
  }
}

export class EvaluatedMove extends Move {
  constructor(
    from: Coordinates,
    to: Coordinates,
    public score: number) {
    super(from, to);
  }

  static from(move: Move, score: number): EvaluatedMove {
    return new EvaluatedMove(move.from, move.to, score)
  }

  static sortBy(player: Player): (em1: EvaluatedMove, em2: EvaluatedMove) => number {
    return (em1: EvaluatedMove, em2: EvaluatedMove) => {
      return player === Player.CPU
        ? em2.score - em1.score
        : em1.score - em2.score;
    };
  }

}