import {match as matchParams} from 'path-to-regexp';
import queryString from 'query-string';
import type {URLMapSchema} from '../types/URLMapSchema';
import type {URLMapSchemaEntry} from '../types/URLMapSchemaEntry';
import type {UnpackedParamsSchema} from '../types/UnpackedParamsSchema';
import type {UnpackedQuerySchema} from '../types/UnpackedQuerySchema';
import {getHash} from './getHash';
import {getOrigin} from './getOrigin';
import {getPath} from './getPath';
import {getQuery} from './getQuery';
import {parse} from './parse';
import {withEqualOrigin} from './withEqualOrigin';

export function match<
    S extends URLMapSchema,
    P extends keyof S = keyof S
>(
    url: string,
    pattern: string,
    urlSchema?: URLMapSchemaEntry<S, P>,
) {
    if (!withEqualOrigin(getOrigin(url), getOrigin(pattern)))
        return null;

    type Params = UnpackedParamsSchema<S, P>;
    type Query = UnpackedQuerySchema<S, P>;

    let paramsSchema = urlSchema?.params;
    let params = {} as Params | null;

    let querySchema = urlSchema?.query;
    let query = {} as Query | null;

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
    else params = paramsMatch.params as Params;

    let queryMatch = queryString.parse(getQuery(url));

    if (querySchema) {
        try {
            query = parse(queryMatch, querySchema);
        } catch {}

        if (query === null || typeof query !== 'object')
            return null;
    }
    else if (queryMatch !== null)
        query = queryMatch as Query;

    return {
        input: url,
        url: pattern,
        params,
        query,
        hash,
    };
}
