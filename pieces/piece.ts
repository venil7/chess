export enum Color {
  white,
  black
}

export interface IPiece {
  color: Color;
  weight: number;
  toString(): String;
}

export class Piece implements IPiece {
  readonly weight: number;
  constructor(public color: Color) { }

  static ofColor(color: Color): Piece {
    return new this(color);
  }

}