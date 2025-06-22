import type {Schema} from 'unpack-schema';
import {parse} from './parse';

function isEmpty(value: unknown) {
    if (
        value === undefined ||
        value === null ||
        value === '' ||
        value === false
    )
        return true;

    if (typeof value === 'object') return Object.keys(value).length === 0;

    return false;
}

export function parseObject<T>(value: unknown, schema: Schema | undefined) {
    let parseResult = {} as T | null;

    if (schema) {
        parseResult = parse(value, schema);

        if (parseResult === null && isEmpty(value))
            parseResult = parse(undefined, schema);

        if (parseResult === undefined) return {} as T;

        if (parseResult === null || typeof parseResult !== 'object')
            return null;
    } else if (value !== null) parseResult = value as T;

    return parseResult;
}
