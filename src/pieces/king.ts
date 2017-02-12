import { Piece, Color } from './piece';
import { Coordinates } from '../coordinates';
import Board from '../board';

export default class King extends Piece {
  get weight(): number { return 5; }

  toString(): string { return this.color == Color.white ? '♔' : '♚' };

  clone(): Piece {
    return new King(this.color);
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
          || board.at(coord).piece.color !== this.color)
    });
  }

}