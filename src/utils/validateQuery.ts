import queryString from 'query-string';
import type {Schema} from 'unpack-schema';
import {parse} from './parse';

export function validateQuery(
    urlQuery: string,
    querySchema: Schema | null | undefined,
): boolean {
    if (querySchema === null || querySchema === undefined) return true;

    try {
        let query = queryString.parse(urlQuery);
        let parseResult = parse(query, querySchema);

        return parseResult !== null && typeof parseResult === 'object';
    } catch {
        return false;
    }
}
