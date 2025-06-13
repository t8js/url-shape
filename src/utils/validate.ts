import type {URLMapSchema} from '../types/URLMapSchema';
import type {URLMapSchemaEntry} from '../types/URLMapSchemaEntry';
import {match} from './match';

export function validate<
    S extends URLMapSchema,
    P extends keyof S = keyof S,
    U extends URLMapSchemaEntry<S, P> = URLMapSchemaEntry<S, P>
>(
    url: string,
    schema: S,
): boolean {
    if (schema === null || schema === undefined) return true;

    for (let [urlPattern, urlSchema] of Object.entries(schema)) {
        if (match<S>(url, urlPattern, urlSchema as U) !== null)
            return true;
    }

    return false;
}
