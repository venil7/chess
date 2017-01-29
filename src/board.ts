import Field from './field';
import { Coordinates } from './coordinates';
import { Pawn, Rook, Knight, Bishop, Queen, King, Color } from './pieces/index';

type Fields = Field[][];

export default class Board {
  private constructor(private fields: Fields) { }
  private static *singleRowGenerator() {
    const WIDTH = 8;
    for (let col = 0; col < WIDTH; col++)
      yield col;
  }
  private static *coordGenerator(row: number) {
    for (const col of Board.singleRowGenerator())
      yield Coordinates.from(col, row);
  }

  private static piecesRow(coordIterator: IterableIterator<Coordinates>, color: Color): Field[] {
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

  private static pawnRow(coordIterator: IterableIterator<Coordinates>, color: Color): Field[] {
    return [...coordIterator].map((coordinates) => new Field(coordinates, new Pawn(color)));
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

  at(coordinates: Coordinates): Field {
    const {col, row} = coordinates;
    return this.fields[row][col];
  }

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