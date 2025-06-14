import {match} from 'path-to-regexp';
import type {Schema} from 'unpack-schema';
import {parse} from './parse';

export function validateParams(
    urlPath: string,
    pathPattern: string,
    paramsSchema: Schema | null | undefined,
): boolean {
    if (paramsSchema === null || paramsSchema === undefined)
        return urlPath === pathPattern;

    try {
        let matchPattern = match(pathPattern);
        let matchResult = matchPattern(urlPath);

        if (matchResult === false) return false;

        let parseResult = parse(matchResult.params, paramsSchema);

        return parseResult !== null && typeof parseResult === 'object';
    } catch {
        return false;
    }
}
