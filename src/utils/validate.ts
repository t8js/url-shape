import type {URLMapSchema} from '../types/URLMapSchema';
import type {URLMapSchemaEntry} from '../types/URLMapSchemaEntry';
import {match} from './match';

export function validate<
    S extends URLMapSchema,
    P extends keyof S = keyof S,
    U extends URLMapSchemaEntry<S, P> = URLMapSchemaEntry<S, P>
>(
    location: string | null | undefined,
    schema: S,
): boolean {
    if (schema === null || schema === undefined) return true;

    let url: string | undefined = undefined;

    if (location === null || location === undefined)
        url = typeof window === 'undefined' ? undefined : window.location.href;

    if (url === undefined) return true;

    for (let [urlPattern, urlSchema] of Object.entries(schema)) {
        if (match<S>(url, urlPattern, urlSchema as U) !== null)
            return true;
    }

    return false;
}
