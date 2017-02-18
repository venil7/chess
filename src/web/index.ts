import { Game, Board } from '../';

const board = Board.newGame();
const next = Game.cpu(board);

console.log(next.toString());