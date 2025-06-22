import type {Schema, UnpackedSchema} from 'unpack-schema';
import type {URLMapSchema} from '../types/URLMapSchema';

type R = Schema<Record<string, unknown>>;
type RX = Schema<Record<string, unknown> | undefined>;

export type UnpackedQuerySchema<
    S extends URLMapSchema,
    P extends keyof S = keyof S,
> = S extends null
    ? Record<string, string | string[]>
    : NonNullable<S>[P] extends {query?: RX}
    ? Record<string, never>
    : NonNullable<S>[P] extends {query: R}
      ? UnpackedSchema<NonNullable<NonNullable<S>[P]>['query']>
      : Record<string, never>;
