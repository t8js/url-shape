import type { PatternObject } from "./PatternObject";
import type { URLMapSchema } from "./URLMapSchema";

export type Pattern<S extends URLMapSchema, P extends keyof S = keyof S> =
  | (S extends null ? string : P)
  | PatternObject;
