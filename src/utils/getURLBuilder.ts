import type {URLMapSchema} from '../types/URLMapSchema';
import type {URLMapSchemaEntry} from '../types/URLMapSchemaEntry';
import type {UnpackedURLSchema} from '../types/UnpackedURLSchema';
import {build} from './build';
import {match} from './match';

type DefaultURLBuilderDataShape = {
    params?: Record<string, unknown>;
    query?: Record<string, unknown>;
};

export function getURLBuilder<S extends URLMapSchema>(schema: S) {
    return <P extends keyof S>(
        pattern: S extends null ? string : P,
        data?: S extends null
            ? DefaultURLBuilderDataShape
            : UnpackedURLSchema<NonNullable<S>[P]>,
    ) => {
        let url = build<S, P>(pattern, data);
        let urlSchema = (schema as S)?.[pattern] as URLMapSchemaEntry<S, P>;

        return {
            _pattern: pattern,
            _schema: urlSchema,
            href: url as P,
            exec: (location: string) => match<S, P>(location, url, urlSchema),
            toString: () => url,
        };
    };
}
