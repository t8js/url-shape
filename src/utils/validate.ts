import {URLValidationError} from '../URLValidationError';
import type {URLMapSchema} from '../types/URLMapSchema';
import {getOrigin} from './getOrigin';
import {getPath} from './getPath';
import {getQuery} from './getQuery';
import {validateParams} from './validateParams';
import {validateQuery} from './validateQuery';
import {withEqualOrigin} from './withEqualOrigin';

export function validate<S extends URLMapSchema>(
    location: string | null | undefined,
    schema: S,
): boolean {
    if (schema === null || schema === undefined) return true;

    let url: string | undefined = undefined;

    if (location === null || location === undefined)
        url = typeof window === 'undefined' ? undefined : window.location.href;

    if (url === undefined) return true;

    let urlOrigin = getOrigin(url);
    let urlPath = getPath(url);
    let urlQuery = getQuery(url);

    let found = false;

    for (let [urlPattern, urlSchema] of Object.entries(schema)) {
        if (urlSchema === null) {
            if (url === urlPattern) return true;

            continue;
        }

        if (!withEqualOrigin(urlOrigin, getOrigin(urlPattern))) continue;

        let hasValidParams = validateParams(
            urlPath,
            getPath(urlPattern),
            urlSchema.params,
        );

        if (!hasValidParams) continue;

        found = true;

        if (validateQuery(urlQuery, urlSchema.query)) return true;
    }

    if (!found)
        throw new URLValidationError('not_found', 'No such URL in schema');

    throw new URLValidationError('invalid', 'Invalid URL');
}
