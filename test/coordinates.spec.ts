/// <reference path="../typings/index.d.ts" />
import { Coordinates } from '../src/coordinates';
import * as chai from 'chai';
const {assert, expect} = chai;

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
    const coords = Coordinates.from(5, 5)
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
    const coords = Coordinates.from(7, 7)
    const next = coords.downright();
    expect(next).to.eql(null);
  });

  it('moves down-left', () => {
    const coords = Coordinates.from(5, 5);
    const next = coords.downleft();
    expect(next).to.eql(Coordinates.from(4, 6));
  });
  it('cant move down-left', () => {
    const coords = Coordinates.from(7, 7)
    const next = coords.downleft();
    expect(next).to.eql(null);
  });
});