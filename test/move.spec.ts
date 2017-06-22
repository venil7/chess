/// <reference path="../typings/index.d.ts" />
import { Move, EvaluatedMove } from '../src/move';
import { Coordinates } from '../src/coordinates';
import { Player, Board } from '../src/board';
import { Pawn, King } from '../src/pieces';
import * as chai from 'chai';
const { assert, expect } = chai;

const from = Coordinates.from(1, 2);
const to = Coordinates.from(1, 3);

const evaluatedMoves = [
  new EvaluatedMove(from, to, +2.001),
  new EvaluatedMove(from, to, -4.009),
  new EvaluatedMove(from, to, -2.005),
  new EvaluatedMove(from, to, +3.005),
  new EvaluatedMove(from, to, -Infinity),
  new EvaluatedMove(from, to, +Infinity),
];

const scores = evaluatedMoves.map(x => x.score).sort((a, b) => a - b);

describe('Move', () => {

  const cpuKing = Coordinates.from(3, 3);
  const cpuPawn = Coordinates.from(4, 3);
  const humanKing = Coordinates.from(3, 4);
  const humanPawn = Coordinates.from(4, 4);

  const board = Board.emptyGame()
    .setAt(cpuKing, new King(Player.CPU))
    .setAt(cpuPawn, new Pawn(Player.CPU))
    .setAt(humanKing, new King(Player.Human))
    .setAt(humanPawn, new Pawn(Player.Human));

  const humanKing_cpuPawn = new Move(humanKing, cpuPawn);
  const cpuKing_humanPawn = new Move(cpuKing, humanPawn);
  const humanKing_cpuKing  = new Move(humanKing, cpuKing);
  const cpuKing_humanKing = new Move(cpuKing, humanKing);

  const moves = [humanKing_cpuPawn, cpuKing_humanPawn, humanKing_cpuKing, cpuKing_humanKing];

  it('sorts moves properly for CPU', () => {
    const sorted = moves.sort(Move.sortBy(Player.CPU, board));
    const expected = [cpuKing_humanKing, cpuKing_humanPawn, humanKing_cpuPawn, humanKing_cpuKing,];
    expect(sorted).to.eql(expected);
  });

  it('sorts moves properly for Human', () => {
    const sorted = moves.sort(Move.sortBy(Player.Human, board));
    const expected = [humanKing_cpuKing, humanKing_cpuPawn, cpuKing_humanPawn, cpuKing_humanKing];
    expect(sorted).to.eql(expected);
  });

  describe('EvaluatedMove', () => {
    it('Sorts properly for Human', () => {
      const sorted = [...evaluatedMoves]
        .sort(EvaluatedMove.sortBy(Player.Human))
        .map(({ score }) => score);
      expect(sorted).to.eql([...scores]);
    });

    it('Sorts properly for CPU', () => {
      const sorted = [...evaluatedMoves]
        .sort(EvaluatedMove.sortBy(Player.CPU))
        .map(({ score }) => score);
      expect(sorted).to.eql([...scores.reverse()]);
    });

  });

});