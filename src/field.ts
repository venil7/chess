import { IPiece } from './pieces/index';
import { Coordinates } from './coordinates';
import Board from './board';
import Move from './move';

export type Fields = Field[];

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

  clone(piece: IPiece = null): Field {
    const {_coordinates: {col, row}, _piece} = this;
    return new Field(
      Coordinates.from(col, row),
      (_piece && _piece.clone()) || piece
    );
  }

  toString(): String {
    const {row, col} = this._coordinates;
    const cell = this.isEmpty ?
      ('　') : this._piece.toString();
    return `[${cell}(${col},${row})]`;
  }

  possibleMoves(board: Board): Move[] {
    return this.isEmpty
      ? []
      : this._piece
        .possibleMoves(this._coordinates, board)
        .map(coordinate => new Move(this._coordinates, coordinate));
  }
}