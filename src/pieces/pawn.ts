import { Piece } from './piece';
import { Coordinates } from '../coordinates';
import { Board, Player } from '../board';

export class Pawn extends Piece {
  readonly _weight = 1;

  toString(): string { return this.player == Player.Human ? '♙' : '♟' };

  weight({ row }: Coordinates): number {
    const coefficient = .01;
    const human = this.player === Player.Human;
    return human
      ? this._weight - ((7 - row) * coefficient)
      : this._weight - (row * coefficient);
  }

  possibleMoves(coordinates: Coordinates, board: Board): Coordinates[] {
    const human = this.player === Player.Human;
    let freeMoves = [];
    if (human) {
      const up = coordinates.up();
      if (up !== null && board.at(up).isEmpty) {
        freeMoves.push(up);
        if (coordinates.row === 6) {
          const up2 = up.up();
          if (board.at(up2).isEmpty) {
            freeMoves.push(up2);
          }
        }
      }
    } else {
      const down = coordinates.down();
      if (down !== null && board.at(down).isEmpty) {
        freeMoves.push(down);
        if (coordinates.row === 1) {
          const down2 = down.down();
          if (board.at(down2).isEmpty) {
            freeMoves.push(down2);
          }
        }
      }
    }

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