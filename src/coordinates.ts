export class Coordinates {
  private constructor(public col: number, public row: number) {
  }
  public up(): Coordinates {
    if (this.row <= 0) {
      return null;
    }
    return Coordinates.from(this.col, this.row - 1);
  }
  public down(): Coordinates {
    if (this.row >= 7) {
      return null;
    }
    return Coordinates.from(this.col, this.row + 1);
  }
  public right(): Coordinates {
    if (this.col >= 7) {
      return null;
    }
    return Coordinates.from(this.col + 1, this.row);
  }
  public left(): Coordinates {
    if (this.col <= 0) {
      return null;
    }
    return Coordinates.from(this.col - 1, this.row);
  }
  public upleft(): Coordinates {
    const step = this.up();
    return step && step.left();
  }
  public upright(): Coordinates {
    const step = this.up();
    return step && step.right();
  }
  public downleft(): Coordinates {
    const step = this.down();
    return step && step.left();
  }
  public downright(): Coordinates {
    const step = this.down();
    return step && step.right();
  }
  static from(col: number, row: number) {
    return new this(col, row);
  }
}