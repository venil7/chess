import { Piece, IPiece, Color } from './piece';

export default class Rook extends Piece implements IPiece {
  get weight(): number { return 3; }
  toString(): string { return this.color == Color.white ? '♖' : '♜' };
  clone(): IPiece {
    return new Rook(this.color);
  }
}