import { Rng, hashCode } from './Rng';

const replacements: Record<string, string[]> = {
  a: ['@', 'α', 'д', '∀'],
  b: ['ъ', 'β', 'ь'],
  c: ['ς'],
  d: [],
  e: ['ξ', '3', 'ε', '∃', 'Σ'],
  f: [],
  g: [],
  h: [],
  i: ['ι'],
  j: [],
  k: ['κ'],
  l: ['1'],
  m: ['м'],
  n: ['и', 'η', 'Π', 'ℕ'],
  o: ['θ', 'σ', 'Ω', '0'],
  p: ['ρ'],
  q: ['ℚ'],
  r: ['я', 'г'],
  s: ['∫'],
  t: ['τ'],
  u: ['ц', '∪', 'μ'], 
  v: [],
  w: ['ψ'],
  x: ['ж', 'χ'],
  y: ['γ'],
  z: [],
};

const proportionToLength = (length: number) => (0.5 * length) / (length + 1);

const jumbleWord = (seed: number) => (word: string): string => {
  const hashVal = hashCode(word);
  const rng = new Rng(hashVal + seed);
  return [...word].reduce((acc, char) => {
    const toLower = char.toLowerCase();
    const letterArr = replacements[toLower];
    const letterArrLength = letterArr.length;
    if (
      letterArrLength &&
      rng.nextFloat() < proportionToLength(letterArrLength)
    ) {
      const ind = rng.nextRange(0, letterArrLength);
      return `${acc}${letterArr[ind]}`;
    }

    const isUpperCase = rng.nextFloat() > 0.5;
    return `${acc}${isUpperCase ? char.toUpperCase() : char.toLowerCase()}`;
  }, '');
};

export const translate = (seed: number) => (text: string) =>
  text.replaceAll(/[a-zA-Z]+/g, jumbleWord(seed));
