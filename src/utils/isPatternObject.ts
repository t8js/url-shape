import type {URLMapSchema} from '../types/URLMapSchema';
import type {PatternObject} from '../types/PatternObject';

export function isPatternObject<S extends URLMapSchema>(x: unknown): x is PatternObject<S> {
    return x !== null && typeof x === 'object' &&
        'exec' in x && typeof x.exec === 'function' &&
        'href' in x && typeof x.href === 'string';
}
