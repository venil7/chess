import { Piece, IPiece, Color } from './piece';
import { Coordinates } from '../field';
import Board from '../board';

export default class Pawn extends Piece implements IPiece {
  get weight(): number { return 1; }
  toString(): string { return this.color == Color.white ? '♙' : '♟' };
  possibleMoves(coordinates: Coordinates, board: Board): Coordinates[] {
    return [];
  }
}