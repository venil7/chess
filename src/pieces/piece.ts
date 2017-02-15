import { Coordinates } from '../coordinates';
import Board, { Player } from '../board';

export abstract class Piece {
  readonly weight: number;
  constructor(public player: Player) { }

  possibleMoves(coordinates: Coordinates, board: Board): Coordinates[] {
    return [];
  }

  clone(): Piece {
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
      } else if (field.piece.player !== this.player) {
        includeStrikes && moves.push(coord);
        break;
      } else break;
    }
    return moves;
  }

}