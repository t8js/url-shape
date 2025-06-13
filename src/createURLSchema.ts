import type {URLMapSchema} from './types/URLMapSchema';
import type {Pattern} from './types/Pattern';
import {getURLBuilder} from './utils/getURLBuilder';
import {validate} from './utils/validate';
import {match} from './utils/match';
import {isPatternObject} from './utils/isPatternObject';
import type {URLMapSchemaEntry} from './types/URLMapSchemaEntry';

export function createURLSchema<S extends URLMapSchema>(schema: S) {
    return {
        url: getURLBuilder<S>(schema),
        validate: (url: string) => validate<S>(url, schema),
        match: <P extends keyof S>(pattern: Pattern<S, P>, url: string) => {
            let stringPattern = isPatternObject<S>(pattern) ? pattern.href : pattern;

            return match<S, P>(
                url,
                stringPattern as string,
                (schema as S)?.[stringPattern as P] as URLMapSchemaEntry<S, P>,
            );
        },
    };
}
