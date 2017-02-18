import { Piece } from './piece';
import { Coordinates } from '../coordinates';
import { Board, Player } from '../board';

export class King extends Piece {
  readonly _weight = 8;

  toString(): string { return this.player == Player.Human ? '♔' : '♚' };

  clone(): Piece {
    return new King(this.player);
  }

  public possibleMoves(coordinates: Coordinates, board: Board) {
    const moves = [
      coordinates.up(), coordinates.upright(),
      coordinates.right(), coordinates.downright(),
      coordinates.down(), coordinates.downleft(),
      coordinates.left(), coordinates.upleft(),
    ];

    return moves.filter(coord => {
      return (coord !== null)
        && (board.at(coord).isEmpty
          || board.at(coord).piece.player !== this.player)
    });
  }

}