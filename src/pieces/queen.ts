import { Piece, Color } from './piece';
import { Coordinates } from '../coordinates';
import Board from '../board';

export default class Queen extends Piece {
  get weight(): number { return 5; }

  toString(): string { return this.color == Color.white ? '♕' : '♛' };

  clone(): Piece {
    return new Queen(this.color);
  }

  public possibleMoves(coordinates: Coordinates, board: Board) {
    return [
      ...this.possiblePathMoves(coordinates.upPath(), board),
      ...this.possiblePathMoves(coordinates.uprightPath(), board),
      ...this.possiblePathMoves(coordinates.rightPath(), board),
      ...this.possiblePathMoves(coordinates.downrightPath(), board),
      ...this.possiblePathMoves(coordinates.downPath(), board),
      ...this.possiblePathMoves(coordinates.downleftPath(), board),
      ...this.possiblePathMoves(coordinates.leftPath(), board),
      ...this.possiblePathMoves(coordinates.upleftPath(), board),
    ];
  }
}