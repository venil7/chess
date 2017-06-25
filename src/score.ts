import { Board } from './board';
import { Field } from './field';
import { Player } from './player';

export const extractWeight = ({ piece, coordinates }: Field) => piece.weight(coordinates);
export const sum = (acc, i) => acc + i;

export const score = (board: Board, depth: number = 0): number => {
  const cpuScore = +board.fieldsByPlayer(Player.CPU).map(extractWeight).reduce(sum, 0).toFixed(2);
  const humanScore = +board.fieldsByPlayer(Player.Human).map(extractWeight).reduce(sum, 0).toFixed(2);
  return cpuScore - humanScore - depth;
};
