import { Piece, IPiece, Color } from './piece';
import { Coordinates } from '../coordinates';
import Board from '../board';

export default class Bishop extends Piece implements IPiece {
  get weight(): number { return 2; }

  toString(): string { return this.color == Color.white ? '♗' : '♝' };

  clone(): IPiece {
    return new Bishop(this.color);
  }

  public possibleMoves(coordinates: Coordinates, board: Board) {
    return [
      ...this.possiblePathMoves(coordinates.upleftPath(), board),
      ...this.possiblePathMoves(coordinates.uprightPath(), board),
      ...this.possiblePathMoves(coordinates.downleftPath(), board),
      ...this.possiblePathMoves(coordinates.downrightPath(), board),
    ];
  }
}