import { Coordinates } from '../coordinates';
import Board from '../board';

export enum Color {
  white,
  black
}

export interface IPiece {
  color: Color;
  weight: number;
  possibleMoves(coordinates: Coordinates, board: Board): Coordinates[];
  toString(): string;
  pristine: boolean;
  clone(): IPiece;
}

export abstract class Piece implements IPiece {
  readonly weight: number;
  constructor(public color: Color) { }

  possibleMoves(coordinates: Coordinates, board: Board): Coordinates[] {
    return [];
  }

  get white(): boolean {
    return this.color === Color.white
  }

  get black(): boolean {
    return !this.white;
  }

  get pristine(): boolean {
    return true;
  }

  clone(): IPiece {
    throw new Error('not implemented in abstract class');
  }

  protected possiblePathMoves(
    path: IterableIterator<Coordinates>|Coordinates[],
    board: Board,
    includeStrikes: boolean = true): Coordinates[] {
    const moves = []
    for (const coord of path) {
      const field = board.at(coord);
      if (field.isEmpty) {
        moves.push(coord);
      } else if (field.piece.color !== this.color) {
        includeStrikes && moves.push(coord);
        break;
      }
    }
    return moves;
  }

}