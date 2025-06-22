import type {UnpackedURLSchema} from 'unpack-schema';
import type {URLMapSchema} from '../types/URLMapSchema';
import type {URLMapSchemaEntry} from '../types/URLMapSchemaEntry';
import {build} from './build';
import {match} from './match';

type DefaultURLBuilderDataShape = {
    params?: Record<string, unknown> | undefined;
    query?: Record<string, unknown> | undefined;
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
            href: url,
            exec: (location: string) => match<S, P>(location, pattern as string, urlSchema),
            compile: (input: typeof data) => build<S, P>(pattern, input),
            toString: () => url,
        };
    };
}
