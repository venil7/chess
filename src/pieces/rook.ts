import { Piece, Color } from './piece';
import { Coordinates } from '../coordinates';
import Board from '../board';

export default class Rook extends Piece {
  get weight(): number { return 3; }

  toString(): string { return this.color == Color.white ? '♖' : '♜' };

  clone(): Piece {
    return new Rook(this.color);
  }

  public possibleMoves(coordinates: Coordinates, board: Board) {
    return [
      ...this.possiblePathMoves(coordinates.upPath(), board),
      ...this.possiblePathMoves(coordinates.downPath(), board),
      ...this.possiblePathMoves(coordinates.leftPath(), board),
      ...this.possiblePathMoves(coordinates.rightPath(), board),
    ];
  }
}