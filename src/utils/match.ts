import {match as matchParams} from 'path-to-regexp';
import queryString from 'query-string';
import type {URLMapSchema} from '../types/URLMapSchema';
import type {URLMapSchemaEntry} from '../types/URLMapSchemaEntry';
import type {UnpackedSchema} from '../types/UnpackedSchema';
import {getHash} from './getHash';
import {getOrigin} from './getOrigin';
import {getPath} from './getPath';
import {getQuery} from './getQuery';
import {parse} from './parse';
import {withEqualOrigin} from './withEqualOrigin';

export function match<
    S extends URLMapSchema,
    P extends keyof S = keyof S,
    U extends URLMapSchemaEntry<S, P> = URLMapSchemaEntry<S, P>
>(
    url: string,
    pattern: string,
    // undefined: any parameters
    // null: no parameters
    urlSchema?: U,
) {
    if (!withEqualOrigin(getOrigin(url), getOrigin(pattern)))
        return null;

    let paramsSchema = urlSchema?.params;
    let params: UnpackedSchema<
        typeof paramsSchema,
        Record<string, string | string[] | undefined>
    > | null = {};

    let querySchema = urlSchema?.query;
    let query: UnpackedSchema<
        typeof querySchema,
        Record<string, string | (string | null)[] | null>
    > | null = {};

    let hash = getHash(url);

    if (urlSchema === null) {
        if (url !== pattern) return null;

        return {
            input: url,
            url: pattern,
            params,
            query,
            hash,
        };
    }

    let matchPattern = matchParams(getPath(pattern));
    let paramsMatch = matchPattern(getPath(url));

    if (paramsMatch === false) return null;

    if (paramsSchema) {
        try {
            params = parse(paramsMatch.params, paramsSchema);
        } catch {}

        if (params === null || typeof params !== 'object')
            return null;
    }
    else params = paramsMatch.params;

    let queryMatch = queryString.parse(getQuery(url));

    if (querySchema) {
        try {
            query = parse(queryMatch, querySchema);
        } catch {}

        if (query === null || typeof query !== 'object')
            return null;
    }
    else if (queryMatch !== null)
        query = queryMatch;

    return {
        input: url,
        url: pattern,
        params,
        query,
        hash,
    };
}
