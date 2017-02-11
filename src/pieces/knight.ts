import { Piece, IPiece, Color } from './piece';
import { Coordinates } from '../coordinates';
import Board from '../board';

export default class Knight extends Piece implements IPiece {
  get weight(): number { return 3; }

  toString(): string { return this.color == Color.white ? '♘' : '♞' };

  clone(): IPiece {
    return new Knight(this.color);
  }

  public possibleMoves(coordinates: Coordinates, board: Board) {
    const moves = [
      coordinates.up().upleft(),
      coordinates.up().upright(),
      coordinates.right().upright(),
      coordinates.right().downright(),
      coordinates.down().downright(),
      coordinates.down().downleft(),
      coordinates.left().downleft(),
      coordinates.left().upleft(),
    ];

    return moves.filter(coord => {
      return (coord !== null)
        && (board.at(coord).isEmpty
          || board.at(coord).piece.color !== this.color)
    });
  }

}