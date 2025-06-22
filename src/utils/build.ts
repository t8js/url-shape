import {compile} from 'path-to-regexp';
import queryString from 'query-string';
import type {UnpackedURLSchema} from 'unpack-schema';
import type {URLMapSchema} from '../types/URLMapSchema';
import {getHash} from './getHash';
import {getOrigin} from './getOrigin';
import {getPath} from './getPath';
import {getQuery} from './getQuery';

type DefaultURLBuilderDataShape = {
    params?: Record<string, unknown>;
    query?: Record<string, unknown>;
};

export function build<S extends URLMapSchema, P extends keyof S = keyof S>(
    pattern: S extends null ? string : P,
    data?: S extends null
        ? DefaultURLBuilderDataShape
        : UnpackedURLSchema<NonNullable<S>[P]>,
) {
    let url = String(pattern);

    if (data === null || data === undefined) return url;

    let urlOrigin = getOrigin(url);
    let urlPath = getPath(url);
    let urlQuery = getQuery(url);
    let urlHash = getHash(url);

    let pathParams: Record<string, string | string[] | undefined> = {};

    for (let [key, value] of Object.entries(data.params ?? {})) {
        if (value === null) continue;
        if (value === undefined || typeof value === 'string')
            pathParams[key] = value;
        else if (Array.isArray(value))
            pathParams[key] = value.map(x => String(x));
        else pathParams[key] = String(value);
    }

    let toPath = compile(urlPath);

    urlPath = toPath(pathParams);
    urlQuery = queryString.stringify(data.query ?? {});

    if (urlQuery !== '' && !urlQuery.startsWith('?')) urlQuery = `?${urlQuery}`;

    url = `${urlOrigin}${urlPath}${urlQuery}${urlHash}`;

    return url;
}
