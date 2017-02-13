import { Coordinates } from './coordinates';
import { Player } from './board';

export type Moves = Move[];

export default class Move {
  constructor(
    public from: Coordinates,
    public to: Coordinates,
  ) { }
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

  static sortFunc(player: Player): (em1: EvaluatedMove, em2: EvaluatedMove) => number {
    return (em1, em2) => {
      return player === Player.CPU
        ? em2.score - em1.score
        : em1.score - em2.score;
    };
  }
}