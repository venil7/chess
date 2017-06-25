import { Piece } from './piece';
import { Coordinates } from '../coordinates';
import { Board } from '../board';
import { Player } from '../player';

export class Knight extends Piece {
  readonly _weight = 3;

  toString(): string {
    return this.player == Player.Human ? '♘' : '♞';
  }

  clone(): Piece {
    return new Knight(this.player);
  }

  public possibleMoves(coord: Coordinates, board: Board) {
    const moves = [
      coord.up() && coord.up().upleft(),
      coord.up() && coord.up().upright(),
      coord.right() && coord.right().upright(),
      coord.right() && coord.right().downright(),
      coord.down() && coord.down().downright(),
      coord.down() && coord.down().downleft(),
      coord.left() && coord.left().downleft(),
      coord.left() && coord.left().upleft()
    ];

    return moves.filter(coord => {
      return coord !== null && (board.at(coord).isEmpty || board.at(coord).piece.player !== this.player);
    });
  }
}
