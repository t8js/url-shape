import type {URLMapSchema} from './URLMapSchema';

export type PatternObject<
    S extends URLMapSchema,
    P extends keyof S = keyof S
> = {
    href: P;
    exec: (s: string) => object | null;
    toString: () => string;
};
