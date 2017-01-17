import { IPiece } from './pieces';

type Square = IPiece | null;

export class Coordinates {
  private constructor(
    private x: Number,
    private y: Number) {
  }
  static from(x: Number, y: Number) {
    return new this(x, y);
  }
}

export default class Field {
  constructor(
    private coordinates: Coordinates,
    private piece: Square = null) {
  }

  get isEmpty(): Boolean {
    return this.piece == null;
  }

  toString(): String {
    const cell = this.isEmpty ?
      '　' : this.piece.toString();
    return `[${cell}]`;
  }

  possibleMoves(): Field[] {
    if (this.isEmpty) {
      return [];
    }

    // return this.piece

  }

  static empty(coordinates: Coordinates): Field {
    return new Field(coordinates);
  }
}