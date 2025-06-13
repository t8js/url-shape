import type {URLMapSchema} from '../types/URLMapSchema';
import type {UnpackedSchema} from '../types/UnpackedSchema';

export type UnpackedParamsSchema<
    S extends URLMapSchema,
    P extends keyof S = keyof S
> = S extends null
    ? Record<string, string | string[] | undefined>
    : NonNullable<S>[P] extends {params: unknown}
    ? UnpackedSchema<NonNullable<NonNullable<S>[P]>['params']>
    : Record<string, never>;
