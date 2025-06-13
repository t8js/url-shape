import type {URLMapSchema} from './URLMapSchema';

export type PatternString<
    S extends URLMapSchema,
    P extends keyof S = keyof S,
> = S extends null ? string : P;
