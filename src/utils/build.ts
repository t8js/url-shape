import { compile } from "path-to-regexp";
import { QuasiURL } from "quasiurl";
import qs from "query-string";
import type { UnpackedURLSchema } from "unpack-schema";
import type { URLMapSchema } from "../types/URLMapSchema";

type DefaultURLBuilderDataShape = {
  params?: Record<string, unknown>;
  query?: Record<string, unknown>;
};

export function build<S extends URLMapSchema, P extends keyof S = keyof S>(
  pattern: S extends null ? string : P,
  data?: S extends null
    ? DefaultURLBuilderDataShape
    : UnpackedURLSchema<NonNullable<S>[P]>,
) {
  let url = String(pattern);

  if (data === null || data === undefined) return url;

  let { origin, pathname: path, hash } = new QuasiURL(url);

  let pathParams: Record<string, string | string[] | undefined> = {};

  for (let [key, value] of Object.entries(data.params ?? {})) {
    if (value === null) continue;
    if (value === undefined || typeof value === "string")
      pathParams[key] = value;
    else if (Array.isArray(value))
      pathParams[key] = value.map((x) => String(x));
    else pathParams[key] = String(value);
  }

  let toPath = compile(path);

  path = toPath(pathParams);

  let query = qs.stringify(data.query ?? {});

  if (query !== "" && !query.startsWith("?")) query = `?${query}`;

  return `${origin}${path}${query}${hash}`;
}
