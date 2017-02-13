/// <reference path="../typings/index.d.ts" />
import { EvaluatedMove } from '../src/move';
import { Coordinates } from '../src/coordinates';
import { Player } from '../src/board';
import * as chai from 'chai';
const { assert, expect } = chai;

const from = Coordinates.from(1, 2);
const to = Coordinates.from(1, 3);

const moves = [
  new EvaluatedMove(from, to, 2),
  new EvaluatedMove(from, to, 4),
  new EvaluatedMove(from, to, 1),
  new EvaluatedMove(from, to, 3),
];

describe('EvaluatedMove', () => {
  it('Sorts properly for CPU', () => {
    const sorted = moves.sort(EvaluatedMove.sortFunc(Player.Human));
    expect(sorted.map(({ score }) => score)).to.eql([1, 2, 3, 4]);
  });

  it('Sorts properly for Human', () => {
    const sorted = moves.sort(EvaluatedMove.sortFunc(Player.CPU));
    expect(sorted.map(({ score }) => score)).to.eql([4, 3, 2, 1]);
  });
});