import { Piece, Color } from './piece';
import { Coordinates } from '../coordinates';
import Board from '../board';

export default class Pawn extends Piece {
  get weight(): number { return 1; }

  toString(): string { return this.color == Color.white ? '♙' : '♟' };

  possibleMoves(coordinates: Coordinates, board: Board): Coordinates[] {
    let freeMoves: Coordinates[] = [];
    freeMoves.push(this.white ?
      coordinates.up() :
      coordinates.down());
    freeMoves = freeMoves.filter(c => board.at(c).isEmpty);
    let strikes = this.white
      ? [coordinates.upleft(), coordinates.upright()]
      : [coordinates.downleft(), coordinates.downright()];
    strikes = strikes.filter(coord => coord !== null
      && !board.at(coord).isEmpty
      && board.at(coord).piece.color !== this.color);
    return [...freeMoves, ...strikes];
  }

  clone(): Piece {
    return new Pawn(this.color);
  }
}