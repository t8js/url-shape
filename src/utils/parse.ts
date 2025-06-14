import type {Schema} from 'unpack-schema';

export function parse<T>(value: unknown, schema: Schema) {
    let parseResult: T | null = null;

    // zod, custom
    if ('parse' in schema && typeof schema.parse === 'function') {
        try {
            parseResult = schema.parse(value) as T;
        } catch {}
    }
    // yup
    else if ('cast' in schema && typeof schema.cast === 'function') {
        try {
            parseResult = schema.cast(value) as T;
        } catch {}
    }

    return parseResult;
}
