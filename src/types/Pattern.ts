import type {URLMapSchema} from './URLMapSchema';
import type {PatternObject} from './PatternObject';
import type {PatternString} from './PatternString';

export type Pattern<
    S extends URLMapSchema,
    P extends keyof S = keyof S
> = PatternString<S, P> | PatternObject<S, P>;
