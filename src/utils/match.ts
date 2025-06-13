import {match as matchParams} from 'path-to-regexp';
import queryString from 'query-string';
import type {URLMapSchema} from '../types/URLMapSchema';
import type {UnpackedSchema} from '../types/UnpackedSchema';
import {getHash} from './getHash';
import {getOrigin} from './getOrigin';
import {getPath} from './getPath';
import {getQuery} from './getQuery';
import {parse} from './parse';
import {withEqualOrigin} from './withEqualOrigin';

export function match<S extends URLMapSchema, P extends keyof S = keyof S>(
    url: string,
    pattern: string,
    urlSchema?: NonNullable<S>[S extends null ? string : P],
) {
    if (!withEqualOrigin(getOrigin(url), getOrigin(pattern)))
        return null;

    let paramsSchema = urlSchema?.params;
    let params: UnpackedSchema<typeof paramsSchema> | null = {};

    let querySchema = urlSchema?.query;
    let query: UnpackedSchema<typeof querySchema> | null = {};

    let hash = getHash(url);

    if (!urlSchema) {
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
    let matchResult = matchPattern(getPath(url));

    if (matchResult === false) return null;

    if (paramsSchema) {
        try {
            params = parse(matchResult.params, paramsSchema);
        } catch {}

        if (params === null || typeof params !== 'object')
            return null;
    }

    if (querySchema) {
        try {
            query = parse(
                queryString.parse(getQuery(url)),
                querySchema,
            );
        } catch {}

        if (query === null || typeof query !== 'object')
            return null;
    }

    return {
        input: url,
        url: pattern,
        params,
        query,
        hash,
    };
}
