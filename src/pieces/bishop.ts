import { Piece, IPiece, Color } from './piece';

export default class Bishop extends Piece implements IPiece {
  get weight(): number { return 2; }
  toString(): string { return this.color == Color.white ? '♗' : '♝' };
  clone(): IPiece {
    return new Bishop(this.color);
  }
}