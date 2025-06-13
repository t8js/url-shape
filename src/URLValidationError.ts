import type {URLValidationErrorCode} from './types/URLValidationErrorCode';

export class URLValidationError extends Error {
    code: URLValidationErrorCode;

    constructor(code: URLValidationErrorCode, message?: string) {
        super(message ?? code);

        // @see https://github.com/Microsoft/TypeScript-wiki/blob/main/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(this, URLValidationError.prototype);

        this.code = code;
        this.name = 'URLValidationError';

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, URLValidationError);
        }
    }
}
