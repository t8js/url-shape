import {match as matchParams} from 'path-to-regexp';
import qs from 'query-string';
import type {UnpackedParamsSchema} from '../types/UnpackedParamsSchema';
import type {UnpackedQuerySchema} from '../types/UnpackedQuerySchema';
import type {URLMapSchema} from '../types/URLMapSchema';
import type {URLMapSchemaEntry} from '../types/URLMapSchemaEntry';
import {parseObject} from './parseObject';
import {withEqualOrigin} from './withEqualOrigin';
import {QuasiURL} from './QuasiURL';

export function match<S extends URLMapSchema, P extends keyof S = keyof S>(
    url: string,
    pattern: string,
    urlSchema?: URLMapSchemaEntry<S, P>,
) {
    let {origin, pathname: path, search: queryString, hash} = new QuasiURL(url);
    let {origin: patternOrigin, pathname: patternPath} = new QuasiURL(pattern);

    if (!withEqualOrigin(origin, patternOrigin)) return null;

    type Params = UnpackedParamsSchema<S, P>;
    type Query = UnpackedQuerySchema<S, P>;

    let paramsSchema = urlSchema?.params;
    let params = {} as Params | null;

    let querySchema = urlSchema?.query;
    let query = {} as Query | null;

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

    let matchPattern = matchParams(patternPath);
    let paramsMatch = matchPattern(path);

    if (paramsMatch === false) return null;

    params = parseObject(paramsMatch.params, paramsSchema);

    if (paramsSchema && params === null) return null;

    let queryMatch = qs.parse(queryString);

    query = parseObject(queryMatch, querySchema);

    if (querySchema && query === null) return null;

    return {
        input: url,
        url: pattern,
        params,
        query,
        hash,
    };
}
