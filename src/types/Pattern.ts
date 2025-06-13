import type {URLMapSchema} from './URLMapSchema';
import type {PatternObject} from './PatternObject';

export type Pattern<
    S extends URLMapSchema,
    P extends keyof S = keyof S
> = S extends null ? string : (P | PatternObject<S>);
