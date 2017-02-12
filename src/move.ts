import { Coordinates } from './coordinates';

export default class Move {
  constructor(
    public from: Coordinates,
    public to: Coordinates,
    // public score: number
  ) { }
}