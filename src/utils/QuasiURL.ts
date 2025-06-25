/**
 * Unlike URL, QuasiURL:
 * - can have an empty origin;
 * - preserves templating characters without URL-encoding them.
 */
export class QuasiURL {
    origin: string;
    pathname: string;
    search: string;
    hash: string;

    constructor(url: string) {
        this.origin = url.match(/^((https?:)?\/\/[^/]+)(\/.*|$)/)?.[1] ?? '';
        this.pathname = url
            .replace(/^((https?:)?\/\/[^/]+)/, '')
            .replace(/\?.*$/, '')
            .replace(/#.*$/, '');
        this.search = url.match(/(\?[^#]+)(#.*)?$/)?.[1] ?? '';
        this.hash = url.match(/(#.+)?$/)?.[1] ?? '';
    }
}
