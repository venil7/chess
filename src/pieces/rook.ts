import { Piece } from './piece';
import { Coordinates } from '../coordinates';
import Board, { Player } from '../board';

export default class Rook extends Piece {
  get weight(): number { return 2; }

  toString(): string { return this.player == Player.Human ? '♖' : '♜' };

  clone(): Piece {
    return new Rook(this.player);
  }

  public possibleMoves(coordinates: Coordinates, board: Board) {
    return [
      ...this.possiblePathMoves(coordinates.upPath(), board),
      ...this.possiblePathMoves(coordinates.downPath(), board),
      ...this.possiblePathMoves(coordinates.leftPath(), board),
      ...this.possiblePathMoves(coordinates.rightPath(), board),
    ];
  }
}