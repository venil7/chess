import { Pawn, Rook, Knight, Bishop, Queen, King, Piece } from './pieces/index';
import { Player } from './player';

export const deserialize = (str: string): Piece => {
  switch (str) {
    case '♟':
      return new Pawn(Player.CPU);
    case '♜':
      return new Rook(Player.CPU);
    case '♞':
      return new Knight(Player.CPU);
    case '♝':
      return new Bishop(Player.CPU);
    case '♛':
      return new Queen(Player.CPU);
    case '♚':
      return new King(Player.CPU);
    case '♙':
      return new Pawn(Player.Human);
    case '♖':
      return new Rook(Player.Human);
    case '♘':
      return new Knight(Player.Human);
    case '♗':
      return new Bishop(Player.Human);
    case '♕':
      return new Queen(Player.Human);
    case '♔':
      return new King(Player.Human);
    default:
      return null;
  }
};
