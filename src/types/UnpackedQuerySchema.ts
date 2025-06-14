import type {UnpackedSchema} from 'unpack-schema';
import type {URLMapSchema} from '../types/URLMapSchema';

export type UnpackedQuerySchema<
    S extends URLMapSchema,
    P extends keyof S = keyof S,
> = S extends null
    ? Record<string, string | string[]>
    : NonNullable<S>[P] extends {query: unknown}
      ? UnpackedSchema<NonNullable<NonNullable<S>[P]>['query']>
      : Record<string, never>;
