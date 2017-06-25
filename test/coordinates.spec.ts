/// <reference path="../typings/index.d.ts" />
import { Coordinates } from '../src/index';
import * as chai from 'chai';
const { assert, expect } = chai;

describe('Coordinates', () => {
  it('moves up', () => {
    const coords = Coordinates.from(5, 5);
    const next = coords.up();
    expect(next).to.eql(Coordinates.from(5, 4));
  });

  it('cant move up', () => {
    const coords = Coordinates.from(5, 0);
    const next = coords.up();
    expect(next).to.eql(null);
  });

  it('moves down', () => {
    const coords = Coordinates.from(5, 5);
    const next = coords.down();
    expect(next).to.eql(Coordinates.from(5, 6));
  });

  it('cant move down', () => {
    const coords = Coordinates.from(5, 7);
    const next = coords.down();
    expect(next).to.eql(null);
  });

  it('moves left', () => {
    const coords = Coordinates.from(5, 5);
    const next = coords.left();
    expect(next).to.eql(Coordinates.from(4, 5));
  });

  it('cant move left', () => {
    const coords = Coordinates.from(0, 7);
    const next = coords.left();
    expect(next).to.eql(null);
  });

  it('moves right', () => {
    const coords = Coordinates.from(5, 5);
    const next = coords.right();
    expect(next).to.eql(Coordinates.from(6, 5));
  });

  it('cant move right', () => {
    const coords = Coordinates.from(7, 5);
    const next = coords.right();
    expect(next).to.eql(null);
  });

  it('moves up-left', () => {
    const coords = Coordinates.from(5, 5);
    const next = coords.upleft();
    expect(next).to.eql(Coordinates.from(4, 4));
  });

  it('cant move up-left', () => {
    const coords = Coordinates.from(0, 0);
    const next = coords.upleft();
    expect(next).to.eql(null);
  });

  it('moves up-right', () => {
    const coords = Coordinates.from(5, 5);
    const next = coords.upright();
    expect(next).to.eql(Coordinates.from(6, 4));
  });

  it('cant move up-right', () => {
    const coords = Coordinates.from(0, 0);
    const next = coords.upright();
    expect(next).to.eql(null);
  });

  it('moves down-right', () => {
    const coords = Coordinates.from(5, 5);
    const next = coords.downright();
    expect(next).to.eql(Coordinates.from(6, 6));
  });

  it('cant move down-right', () => {
    const coords = Coordinates.from(7, 7);
    const next = coords.downright();
    expect(next).to.eql(null);
  });

  it('moves down-left', () => {
    const coords = Coordinates.from(5, 5);
    const next = coords.downleft();
    expect(next).to.eql(Coordinates.from(4, 6));
  });

  it('cant move down-left', () => {
    const coords = Coordinates.from(7, 7);
    const next = coords.downleft();
    expect(next).to.eql(null);
  });

  it('up path', () => {
    const coords = Coordinates.from(3, 3);
    const upPath = [...coords.upPath()];
    expect(upPath).to.deep.include.members([Coordinates.from(3, 2), Coordinates.from(3, 1), Coordinates.from(3, 0)]);
  });

  it('down path', () => {
    const coords = Coordinates.from(3, 3);
    const downPath = [...coords.downPath()];
    expect(downPath).to.deep.include.members([
      Coordinates.from(3, 4),
      Coordinates.from(3, 5),
      Coordinates.from(3, 6),
      Coordinates.from(3, 7)
    ]);
  });

  it('left path', () => {
    const coords = Coordinates.from(3, 3);
    const leftPath = [...coords.leftPath()];
    expect(leftPath).to.deep.include.members([Coordinates.from(2, 3), Coordinates.from(1, 3), Coordinates.from(0, 3)]);
  });

  it('right path', () => {
    const coords = Coordinates.from(3, 3);
    const rightPath = [...coords.rightPath()];
    expect(rightPath).to.deep.include.members([
      Coordinates.from(4, 3),
      Coordinates.from(5, 3),
      Coordinates.from(6, 3),
      Coordinates.from(7, 3)
    ]);
  });

  it('up-right path', () => {
    const coords = Coordinates.from(3, 3);
    const uprightPath = [...coords.uprightPath()];
    expect(uprightPath).to.deep.include.members([
      Coordinates.from(4, 2),
      Coordinates.from(5, 1),
      Coordinates.from(6, 0)
    ]);
  });

  it('up-left path', () => {
    const coords = Coordinates.from(3, 3);
    const upleftPath = [...coords.upleftPath()];
    expect(upleftPath).to.deep.include.members([
      Coordinates.from(2, 2),
      Coordinates.from(1, 1),
      Coordinates.from(0, 0)
    ]);
  });

  it('down-right path', () => {
    const coords = Coordinates.from(3, 3);
    const downrightPath = [...coords.downrightPath()];
    expect(downrightPath).to.deep.include.members([
      Coordinates.from(4, 4),
      Coordinates.from(5, 5),
      Coordinates.from(6, 6),
      Coordinates.from(7, 7)
    ]);
  });

  it('down-left path', () => {
    const coords = Coordinates.from(3, 3);
    const downleftPath = [...coords.downleftPath()];
    expect(downleftPath).to.deep.include.members([
      Coordinates.from(2, 4),
      Coordinates.from(1, 5),
      Coordinates.from(0, 6)
    ]);
  });
});
