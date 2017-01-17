import { Piece, IPiece, Color } from './piece';

export default class King extends Piece implements IPiece {
  get weight(): number { return 5; }
  toString(): string { return this.color == Color.white ? '♔' : '♚' };
}