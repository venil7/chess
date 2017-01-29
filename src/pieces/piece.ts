import { Coordinates } from '../field';
import Board from '../board';

export enum Color {
  white,
  black
}

export interface IPiece {
  color: Color;
  weight: number;
  possibleMoves(coordinates: Coordinates, board: Board): Coordinates[];
  toString(): String;
}

export class Piece implements IPiece {
  readonly weight: number;
  constructor(public color: Color) { }

  possibleMoves(coordinates: Coordinates, board: Board): Coordinates[] {
    return [];
  }

  static ofColor(color: Color): Piece {
    return new this(color);
  }

}