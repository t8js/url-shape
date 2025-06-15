import type {PatternObject} from '../types/PatternObject';

export function isPatternObject(x: unknown): x is PatternObject {
    return (
        x !== null &&
        typeof x === 'object' &&
        'exec' in x &&
        typeof x.exec === 'function' &&
        'href' in x &&
        typeof x.href === 'string'
    );
}
