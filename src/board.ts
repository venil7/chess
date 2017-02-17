import { Move, Moves } from './move';
import { Field, Fields } from './field';
import { Coordinates } from './coordinates';
import { deserialize } from './deserialize';
import {
  Pawn, Rook, Knight, Bishop,
  Queen, King, Piece
} from './pieces/index';

export enum Player {
  None,
  CPU,
  Human
}

export const player = (s: string) => {
  switch (s.toLowerCase()) {
    case 'cpu': return Player.CPU;
    case 'human': return Player.Human;
    default: return Player.None;
  }
}

export const opponent = (player: Player) => {
  const { CPU, Human, None } = Player;
  switch (player) {
    case CPU: return Human;
    case Human: return CPU;
    default: return None;
  }
}

export class Board {
  constructor(private _fields: Fields) { }

  public get fields() {
    return this._fields;
  }

  private static *singleRowGenerator() {
    const WIDTH = 8;
    for (let col = 0; col < WIDTH; col++) yield col;
  }

  private static *coordGenerator(row: number) {
    for (const col of Board.singleRowGenerator())
      yield Coordinates.from(col, row);
  }

  static piecesRow(coordIterator: IterableIterator<Coordinates>, player: Player): Field[] {
    return [
      new Field(coordIterator.next().value, new Rook(player)),
      new Field(coordIterator.next().value, new Knight(player)),
      new Field(coordIterator.next().value, new Bishop(player)),
      new Field(coordIterator.next().value, new Queen(player)),
      new Field(coordIterator.next().value, new King(player)),
      new Field(coordIterator.next().value, new Bishop(player)),
      new Field(coordIterator.next().value, new Knight(player)),
      new Field(coordIterator.next().value, new Rook(player))
    ];
  };

  static pawnRow(coordIterator: IterableIterator<Coordinates>, player: Player): Field[] {
    return [...coordIterator].map((coordinates) => new Field(coordinates, new Pawn(player)));
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
      ...Board.piecesRow(Board.coordGenerator(0), Player.CPU),
      ...Board.pawnRow(Board.coordGenerator(1), Player.CPU),
      ...Board.emptyRow(Board.coordGenerator(2)),
      ...Board.emptyRow(Board.coordGenerator(3)),
      ...Board.emptyRow(Board.coordGenerator(4)),
      ...Board.emptyRow(Board.coordGenerator(5)),
      ...Board.pawnRow(Board.coordGenerator(6), Player.Human),
      ...Board.piecesRow(Board.coordGenerator(7), Player.Human),
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

  public setAt({ row, col, index }: Coordinates, piece: Piece): Board {
    const clone = this.clone();
    clone._fields[index] = new Field(Coordinates.from(col, row), piece);
    return clone;
  }

  public emptyAt(coordinates: Coordinates): Board {
    return this.setAt(coordinates, null);
  }

  public makeMove({ from, to }: Move): Board {
    const { isEmpty, piece } = this.at(from);
    if (isEmpty) throw new Error('can`t make move from empty field');
    const clone = this
      .emptyAt(from)
      .setAt(to, piece.clone());
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
    return this.winner !== Player.None;
  }

  public get winner(): Player {
    const [king1, king2] = [
      ...this.fieldsByPlayer(Player.CPU),
      ...this.fieldsByPlayer(Player.Human)
    ].filter(({ piece }) => piece instanceof King)
      .map(({ piece }) => piece);

    return (king1 && king2)
      ? Player.None
      : king1.player;
  }

  public fieldsByPlayer(player: Player): Field[] {
    return this.fields
      .filter(field => !field.isEmpty && field.piece.player === player);
  }

  public possibleMoves(player: Player): Moves {
    return this.fieldsByPlayer(player)
      .map((field) => field.possibleMoves(this))
      .reduce((acc, moves) => acc.concat(moves), <Moves>[]);
  }

  public toJSON(): string[] {
    return this.fields.map(({ isEmpty, piece }) =>
      isEmpty ? null : `${piece}`);
  }

  public static fromJSON(json: string[]): Board {
    const fields = json.map((item, index) =>
      new Field(Coordinates.fromIndex(index), deserialize(item)));
    return new Board(fields);
  }
}