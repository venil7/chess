export class Coordinates {
  private constructor(public col: number, public row: number) {
  }

  static from(col: number, row: number) {
    return new this(col, row);
  }

  static fromIndex(index: number) {
    const col = index % 8;
    const row = Math.floor(index / 8);
    return new this(col, row);
  }

  private buildPath(getNext: (c: Coordinates) => Coordinates): Coordinates[] {
    let next = getNext(this);
    const result = [];
    while (next !== null) {
      result.push(next);
      next = getNext(next);
    }
    return result;
  }

  public get index(): number {
    return this.row * 8 + this.col;
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

  public upPath(): Coordinates[] {
    return this.buildPath(c => c.up());
  }

  public downPath(): Coordinates[] {
    return this.buildPath(c => c.down());
  }

  public leftPath(): Coordinates[] {
    return this.buildPath(c => c.left());
  }

  public rightPath(): Coordinates[] {
    return this.buildPath(c => c.right());
  }

  public upleftPath(): Coordinates[] {
    return this.buildPath(c => c.upleft());
  }

  public uprightPath(): Coordinates[] {
    return this.buildPath(c => c.upright());
  }

  public downleftPath(): Coordinates[] {
    return this.buildPath(c => c.downleft());
  }

  public downrightPath(): Coordinates[] {
    return this.buildPath(c => c.downright());
  }
}