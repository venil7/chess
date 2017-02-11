import { Piece, IPiece, Color } from './piece';
import { Coordinates } from '../coordinates';
import Board from '../board';

export default class Queen extends Piece implements IPiece {
  get weight(): number { return 4; }

  toString(): string { return this.color == Color.white ? '♕' : '♛' };

  clone(): IPiece {
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