import type {URLValidationError} from './URLValidationError';

export function isURLValidationError(x: unknown): x is URLValidationError {
    return x instanceof Error && x.name === 'URLValidationError';
}
