import Move from './move';
import Field from './field';
import { Coordinates } from './coordinates';
import { Pawn, Rook, Knight, Bishop, Queen, King, Color, Piece } from './pieces/index';

export type Fields = Field[];

export default class Board {
  constructor(
    private _fields: Fields,
    private _color: Color = Color.white) { }

  public get fields() {
    return this._fields;
  }

  private static *singleRowGenerator() {
    const WIDTH = 8;
    for (let col = 0; col < WIDTH; col++)
      yield col;
  }

  private static *coordGenerator(row: number) {
    for (const col of Board.singleRowGenerator())
      yield Coordinates.from(col, row);
  }

  static piecesRow(coordIterator: IterableIterator<Coordinates>, color: Color): Field[] {
    return [
      new Field(coordIterator.next().value, new Rook(color)),
      new Field(coordIterator.next().value, new Knight(color)),
      new Field(coordIterator.next().value, new Bishop(color)),
      new Field(coordIterator.next().value, new Queen(color)),
      new Field(coordIterator.next().value, new King(color)),
      new Field(coordIterator.next().value, new Bishop(color)),
      new Field(coordIterator.next().value, new Knight(color)),
      new Field(coordIterator.next().value, new Rook(color))
    ];
  };

  static pawnRow(coordIterator: IterableIterator<Coordinates>, color: Color): Field[] {
    return [...coordIterator].map((coordinates) => new Field(coordinates, new Pawn(color)));
  };

  private static emptyRow(coordIterator: IterableIterator<Coordinates>): Field[] {
    return [...coordIterator].map((coordinates) => new Field(coordinates));
  };

  static emptyGame(): Board {
    const fields: Fields = [
      ...Board.emptyRow(Board.coordGenerator(0)),
      ...Board.emptyRow(Board.coordGenerator(1)),
      ...Board.emptyRow(Board.coordGenerator(2)),
      ...Board.emptyRow(Board.coordGenerator(3)),
      ...Board.emptyRow(Board.coordGenerator(4)),
      ...Board.emptyRow(Board.coordGenerator(5)),
      ...Board.emptyRow(Board.coordGenerator(6)),
      ...Board.emptyRow(Board.coordGenerator(7)),
    ];

    return new Board(fields);
  }

  static newGame(): Board {
    const fields: Fields = [
      ...Board.piecesRow(Board.coordGenerator(0), Color.black),
      ...Board.pawnRow(Board.coordGenerator(1), Color.black),
      ...Board.emptyRow(Board.coordGenerator(2)),
      ...Board.emptyRow(Board.coordGenerator(3)),
      ...Board.emptyRow(Board.coordGenerator(4)),
      ...Board.emptyRow(Board.coordGenerator(5)),
      ...Board.pawnRow(Board.coordGenerator(6), Color.white),
      ...Board.piecesRow(Board.coordGenerator(7), Color.white),
    ];

    return new Board(fields);
  };

  public at(coordinates: Coordinates): Field {
    return this.fields[coordinates.index];
  }

  public clone(): Board {
    const fields = this.fields
      .map((field) => field.clone());
    return new Board(fields);
  }

  public setAt(coordinates: Coordinates, piece: Piece = null): Board {
    const clone = this.clone();
    const { col, row } = coordinates;
    clone._fields[coordinates.index] = new Field(Coordinates.from(col, row), piece);
    return clone;
  }

  public toString(): string {
    let str = '';
    this.fields.forEach((field, index) => {
      const ending = ((index + 1) % 8) === 0 ? '\n' : '';
      str += `${field}${ending}`;
    });
    return str;
  }

  public get gameOver(): boolean {
    return false;
  }

  public fieldsByColor(color: Color): Field[] {
    return this.fields
      .filter(field => !field.isEmpty && field.piece.color === color);
  }

  public possibleMoves(): Move[] {
    return [];
  }
}