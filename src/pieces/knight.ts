import { Piece, IPiece, Color } from './piece';

export default class Knight extends Piece implements IPiece {
  get weight(): number { return 3; }
  toString(): string { return this.color == Color.white ? '♘' : '♞' };
  clone(): IPiece {
    return new Knight(this.color);
  }
}