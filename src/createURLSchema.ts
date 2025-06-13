import type {URLMapSchema} from './types/URLMapSchema';
import type {URLMapSchemaEntry} from './types/URLMapSchemaEntry';
import type {Pattern} from './types/Pattern';
import {getURLBuilder} from './utils/getURLBuilder';
import {validate} from './utils/validate';
import {match} from './utils/match';
import {isPatternObject} from './utils/isPatternObject';

export function createURLSchema<
    S extends URLMapSchema,
    P extends keyof S = keyof S,
    U extends URLMapSchemaEntry<S, P> = URLMapSchemaEntry<S, P>
>(schema: S) {
    return {
        url: getURLBuilder<S>(schema),
        validate: (url: string) => validate<S>(url, schema),
        match: (pattern: Pattern<S>, url: string) => {
            let stringPattern = isPatternObject<S>(pattern) ? pattern.href : pattern;

            return match<S>(
                url,
                stringPattern as string,
                schema === null ? undefined : ((schema as S)?.[stringPattern as P] ?? null) as U,
            );
        },
    };
}
