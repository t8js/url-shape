import {compile, match} from 'path-to-regexp';
import queryString from 'query-string';
import type {URLMapSchema} from '../types/URLMapSchema';
import type {UnpackedSchema} from '../types/UnpackedSchema';
import type {UnpackedURLSchema} from '../types/UnpackedURLSchema';
import {getHash} from './getHash';
import {getOrigin} from './getOrigin';
import {getPath} from './getPath';
import {getQuery} from './getQuery';
import {parse} from './parse';
import {withEqualOrigin} from './withEqualOrigin';

type DefaultURLBuilderDataShape = {
    params?: Record<string, unknown>;
    query?: Record<string, unknown>;
};

export function getURLBuilder<S extends URLMapSchema>(schema: S) {
    return <P extends keyof S>(
        pattern: S extends null ? string : P,
        data?: S extends null
            ? DefaultURLBuilderDataShape
            : UnpackedURLSchema<NonNullable<S>[P]>,
    ) => {
        let url = String(pattern);

        let urlOrigin = getOrigin(url);
        let urlPath = getPath(url);
        let urlQuery = getQuery(url);
        let urlHash = getHash(url);

        if (data !== null && data !== undefined) {
            if ('params' in data && data.params) {
                let pathParams: Record<string, string | string[] | undefined> =
                    {};

                for (let [key, value] of Object.entries(data.params)) {
                    if (value === null) continue;
                    if (value === undefined || typeof value === 'string')
                        pathParams[key] = value;
                    else if (Array.isArray(value))
                        pathParams[key] = value.map(x => String(x));
                    else pathParams[key] = String(value);
                }

                let toPath = compile(urlPath);
                urlPath = toPath(pathParams);
            }

            if ('query' in data && data.query)
                urlQuery = queryString.stringify(data.query);

            if (urlQuery !== '' && !urlQuery.startsWith('?'))
                urlQuery = `?${urlQuery}`;

            url = `${urlOrigin}${urlPath}${urlQuery}${urlHash}`;
        }

        urlOrigin = getOrigin(url);
        urlPath = getPath(url);
        urlQuery = getQuery(url);
        urlHash = getHash(url);

        let urlSchema = (schema as S)?.[pattern];

        return {
            _pattern: pattern,
            _schema: urlSchema,
            href: url,
            exec: (location: string) => {
                if (!withEqualOrigin(getOrigin(location), urlOrigin))
                    return null;

                let paramsSchema = urlSchema?.params;
                let params: UnpackedSchema<typeof paramsSchema> | null = {};

                let querySchema = urlSchema?.query;
                let query: UnpackedSchema<typeof querySchema> | null = {};

                let hash = getHash(location);

                if (!urlSchema) {
                    if (location !== url) return null;

                    return {
                        input: location,
                        url: pattern,
                        params,
                        query,
                        hash,
                    };
                }

                let matchPattern = match(urlPath);
                let matchResult = matchPattern(getPath(location));

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
                            queryString.parse(getQuery(location)),
                            querySchema,
                        );
                    } catch {}

                    if (query === null || typeof query !== 'object')
                        return null;
                }

                return {
                    input: location,
                    url: pattern,
                    params,
                    query,
                    hash,
                };
            },
            toString: () => url,
        };
    };
}
