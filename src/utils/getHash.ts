export function getHash(url: string) {
    let hash = url.match(/(#.*)?$/)?.[1] ?? '';

    return hash === '#' ? '' : hash;
}
