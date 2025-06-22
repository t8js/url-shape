import type {Schema} from 'unpack-schema';
import {parse} from './parse';

export function parseObject<T>(value: unknown, schema: Schema | undefined) {
    let parseResult = {} as T | null;

    if (schema) {
        parseResult = parse(value, schema);

        if (parseResult === null || typeof parseResult !== 'object') return null;
    }
    else if (value !== null)
        parseResult = value as T;

    return parseResult;
}
