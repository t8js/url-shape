import { compile } from "path-to-regexp";
import { QuasiURL } from "quasiurl";
import type { URLComponents } from "../types/URLComponents";
import { toStringMap } from "./toStringMap";

export function build(
  pattern: string,
  data?: URLComponents | null | undefined,
) {
  let url = String(pattern);

  if (data === null || data === undefined) return url;

  let { origin, pathname, hash } = new QuasiURL(url);

  try {
    let toPath = compile(pathname);

    pathname = toPath(toStringMap(data.params));
  } catch {}

  let query = String(new URLSearchParams(toStringMap(data.query)));

  if (query !== "" && !query.startsWith("?")) query = `?${query}`;

  return `${origin}${pathname}${query}${hash}`;
}
