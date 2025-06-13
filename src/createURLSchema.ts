import type {URLMapSchema} from './types/URLMapSchema';
import {getURLBuilder} from './utils/getURLBuilder';
import {validate} from './utils/validate';

export function createURLSchema<S extends URLMapSchema>(schema: S) {
    return {
        url: getURLBuilder<S>(schema),
        validate: (location: string | null | undefined) => validate<S>(location, schema),
    };
}
