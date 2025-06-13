import type {URLMapSchema} from './URLMapSchema';
import type {PatternString} from './PatternString';

export type PatternObject<
    S extends URLMapSchema,
    P extends keyof S = keyof S
> = {
    href: PatternString<S, P>;
    exec: (s: string) => object | null;
    toString: () => string;
};
