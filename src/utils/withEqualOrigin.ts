export function withEqualOrigin(
    origin1: string | undefined,
    origin2: string | undefined,
) {
    let fallbackOrigin =
        typeof window === 'undefined' ? '' : window.location.origin;

    return (origin1 || fallbackOrigin) === (origin2 || fallbackOrigin);
}
