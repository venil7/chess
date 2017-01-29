import { IPiece } from './pieces/index';
import { Coordinates } from './coordinates';
import Board from './board';

export default class Field {
  constructor(
    private _coordinates: Coordinates,
    private _piece: IPiece = null) {
  }

  get piece(): IPiece {
    return this._piece;
  }

  get isEmpty(): Boolean {
    return this._piece == null;
  }

  toString(): String {
    const {row, col} = this._coordinates;
    const cell = this.isEmpty ?
      ('　') : this._piece.toString();
    return `[${cell}(${row}, ${col})]`;
  }

  possibleMoves(board: Board): Coordinates[] {
    return this.isEmpty
      ? []
      : this._piece.possibleMoves(this._coordinates, board);
  }

  static empty(coordinates: Coordinates): Field {
    return new Field(coordinates);
  }
}