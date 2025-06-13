import type {URLMapSchema} from './URLMapSchema';

export type URLMapSchemaEntry<
    S extends URLMapSchema,
    P extends keyof S = keyof S,
> = S extends null ? undefined : NonNullable<S>[P];
