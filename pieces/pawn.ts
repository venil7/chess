import { Piece, IPiece, Color } from './piece';

export default class Pawn extends Piece implements IPiece {
  get weight(): number { return 1; }
  toString(): string { return this.color == Color.white ? '♙' : '♟' };
}