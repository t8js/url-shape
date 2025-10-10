export type PatternObject = {
  href: string;
  exec: (s: string) => object | null;
  toString: () => string;
};
