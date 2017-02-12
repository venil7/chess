export class Coordinates {
  private constructor(public col: number, public row: number) {
  }

  static from(col: number, row: number) {
    return new this(col, row);
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

  public *upPath() {
    let next = this.up();
    while (next !== null) {
      yield next;
      next = next.up();
    }
  }

  public *downPath() {
    let next = this.down();
    while (next !== null) {
      yield next;
      next = next.down();
    }
  }

  public *leftPath() {
    let next = this.left();
    while (next !== null) {
      yield next;
      next = next.left();
    }
  }

  public *rightPath() {
    let next = this.right();
    while (next !== null) {
      yield next;
      next = next.right();
    }
  }

  public *upleftPath() {
    let next = this.upleft();
    while (next !== null) {
      yield next;
      next = next.upleft();
    }
  }

  public *uprightPath() {
    let next = this.upright();
    while (next !== null) {
      yield next;
      next = next.upright();
    }
  }
  public *downleftPath() {
    let next = this.downleft();
    while (next !== null) {
      yield next;
      next = next.downleft();
    }
  }

  public *downrightPath() {
    let next = this.downright();
    while (next !== null) {
      yield next;
      next = next.downright();
    }
  }
}