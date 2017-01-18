import { IPiece } from './pieces/index';
import Board from './board';

type Square = IPiece | null;

export class Coordinates {
  private constructor(public x: Number, public y: Number) {
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
    const {x, y} = this.coordinates;
    const cell = this.isEmpty ?
      ('　') : this.piece.toString();
    return `[${cell}(${x}, ${y})]`;
  }

  possibleMoves(board: Board): Coordinates[] {
    if (this.isEmpty) {
      return [];
    }

    return this.piece.possibleMoves(this.coordinates, board);
  }

  static empty(coordinates: Coordinates): Field {
    return new Field(coordinates);
  }
}