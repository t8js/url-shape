export function getOrigin(url: string) {
    return url.match(/^((https?:)?\/\/[^\/]+)(\/.*|$)/)?.[1] ?? '';
}
