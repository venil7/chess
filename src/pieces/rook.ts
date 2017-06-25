import { Piece } from './piece';
import { Coordinates } from '../coordinates';
import { Board } from '../board';
import { Player } from '../player';

export class Rook extends Piece {
  readonly _weight = 2;

  toString(): string {
    return this.player == Player.Human ? '♖' : '♜';
  }

  clone(): Piece {
    return new Rook(this.player);
  }

  public possibleMoves(coordinates: Coordinates, board: Board) {
    return [
      ...this.possiblePathMoves(coordinates.upPath(), board),
      ...this.possiblePathMoves(coordinates.downPath(), board),
      ...this.possiblePathMoves(coordinates.leftPath(), board),
      ...this.possiblePathMoves(coordinates.rightPath(), board)
    ];
  }
}
