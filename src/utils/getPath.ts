export function getPath(url: string) {
    return (
        url
            // strip origin
            .replace(/^((https?:)?\/\/[^\/]+)/, '')
            // strip query
            .replace(/\?.*$/, '')
            // strip hash
            .replace(/#.*$/, '')
    );
}
