import type {PatternObject} from '../types/PatternObject';
import type {URLMapSchema} from '../types/URLMapSchema';

export function isPatternObject<S extends URLMapSchema>(
    x: unknown,
): x is PatternObject<S> {
    return (
        x !== null &&
        typeof x === 'object' &&
        'exec' in x &&
        typeof x.exec === 'function' &&
        'href' in x &&
        typeof x.href === 'string'
    );
}
