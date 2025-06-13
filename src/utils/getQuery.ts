export function getQuery(url: string) {
    let query = url.match(/(\?[^#]+)(#.*)?$/)?.[1] ?? '';

    return query === '?' ? '' : query;
}
