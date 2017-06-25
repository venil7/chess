import { Piece } from './piece';
import { Coordinates } from '../coordinates';
import { Board } from '../board';
import { Player } from '../player';

export class Bishop extends Piece {
  readonly _weight = 2;

  toString(): string {
    return this.player == Player.Human ? '♗' : '♝';
  }

  clone(): Piece {
    return new Bishop(this.player);
  }

  public possibleMoves(coordinates: Coordinates, board: Board) {
    return [
      ...this.possiblePathMoves(coordinates.upleftPath(), board),
      ...this.possiblePathMoves(coordinates.uprightPath(), board),
      ...this.possiblePathMoves(coordinates.downleftPath(), board),
      ...this.possiblePathMoves(coordinates.downrightPath(), board)
    ];
  }
}
