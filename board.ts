import Field, { Coordinates } from './field';
import { Pawn, Rook, Knight, Bishop, Queen, King, Color } from 'pieces/index';

type Fields = Field[][];

export default class Board {
  private fields: Fields;
  private constructor(fields: Fields) {
    this.fields = fields;
  }
  private static *rowGenerator() {
    const WIDTH = 8;
    for (let x = 0; x < WIDTH; x++)
      yield x;
  }
  private static *coordGenerator(y: Number) {
    for (const x of Board.rowGenerator())
      yield Coordinates.from(x, y);
  }

  private static piecesRow(coordIterator: IterableIterator<Coordinates>, color: Color): Field[] {
    return [
      new Field(coordIterator.next().value, Rook.ofColor(color)),
      new Field(coordIterator.next().value, Knight.ofColor(color)),
      new Field(coordIterator.next().value, Bishop.ofColor(color)),
      new Field(coordIterator.next().value, Queen.ofColor(color)),
      new Field(coordIterator.next().value, King.ofColor(color)),
      new Field(coordIterator.next().value, Bishop.ofColor(color)),
      new Field(coordIterator.next().value, Knight.ofColor(color)),
      new Field(coordIterator.next().value, Rook.ofColor(color))
    ];
  };

  private static pawnRow(coordIterator: IterableIterator<Coordinates>, color: Color): Field[] {
    return [...coordIterator].map((coordinates) => new Field(coordinates, Pawn.ofColor(color)));
  };

  private static emptyRow(coordIterator: IterableIterator<Coordinates>): Field[] {
    return [...coordIterator].map((coordinates) => new Field(coordinates));
  };

  static newGame(): Board {
    const fields: Fields = [
      Board.piecesRow(Board.coordGenerator(0), Color.black),
      Board.pawnRow(Board.coordGenerator(1), Color.black),
      Board.emptyRow(Board.coordGenerator(2)),
      Board.emptyRow(Board.coordGenerator(3)),
      Board.emptyRow(Board.coordGenerator(4)),
      Board.emptyRow(Board.coordGenerator(5)),
      Board.pawnRow(Board.coordGenerator(6), Color.white),
      Board.piecesRow(Board.coordGenerator(7), Color.white),
    ];

    return new Board(fields);
  };

  toString(): string {
    let str = '';
    for (const row of this.fields) {
      for (const cell of row) {
        str += cell.toString();
      }
      str += '\n';
    }
    return str;
  }
}