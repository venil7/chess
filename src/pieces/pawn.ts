import { Piece } from './piece';
import { Coordinates } from '../coordinates';
import { Board, Player } from '../board';

export class Pawn extends Piece {
  get weight(): number { return 1; }

  toString(): string { return this.player == Player.Human ? '♙' : '♟' };

  possibleMoves(coordinates: Coordinates, board: Board): Coordinates[] {
    const human = this.player === Player.Human;
    let freeMoves: Coordinates[] = [];
    freeMoves.push(human ?
      coordinates.up() :
      coordinates.down());

    freeMoves = freeMoves.filter(c => board.at(c).isEmpty);

    let strikes = human
      ? [coordinates.upleft(), coordinates.upright()]
      : [coordinates.downleft(), coordinates.downright()];

    strikes = strikes.filter(coord => coord !== null
      && !board.at(coord).isEmpty
      && board.at(coord).piece.player !== this.player);
    return [...freeMoves, ...strikes];
  }

  clone(): Piece {
    return new Pawn(this.player);
  }
}