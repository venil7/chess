import { Piece, IPiece, Color } from './piece';

export default class Queen extends Piece implements IPiece {
  get weight(): number { return 4; }
  toString(): string { return this.color == Color.white ? '♕' : '♛' };
  clone(): IPiece {
    return new Queen(this.color);
  }
}