export class Rng {
  // LCG using GCC's constants
  private readonly m: number = 0x80000000;

  private readonly a: number = 1103515245;

  private readonly c: number = 12345;

  private state: number;

  constructor(public readonly seed?: number) {
    const s = seed || Math.floor(Math.random() * (this.m - 1));
    this.state = Math.floor(s % this.m);
  }

  nextInt() {
    this.state = Math.abs((this.a * this.state + this.c) % this.m);
    return this.state;
  }

  nextFloat() {
    return this.nextInt() / (this.m - 1);
  }

  nextRange(start: number, end: number) {
    // returns in range [start, end): including start, excluding end
    // can't modulu nextInt because of weak randomness in lower bits
    const rangeSize = end - start;
    const randomUnder1 = this.nextInt() / this.m;
    return start + Math.floor(randomUnder1 * rangeSize);
  }
}

/* eslint no-bitwise: ["error", { "allow": ["<<","&"] }] */
export const hashCode = (s: string) =>
  s.split('').reduce((a, b) => {
    const ret = (a << 5) - a + b.charCodeAt(0);
    return ret & ret;
  }, 0);
