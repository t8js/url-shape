import { match as matchParams } from "path-to-regexp";
import { QuasiURL } from "quasiurl";
import type { URLSchema } from "../types/URLSchema";
import { parseObject } from "./parseObject";

export function match(
  url: string,
  pattern: string,
  urlSchema?: URLSchema | null | undefined,
) {
  let { origin, pathname, search, hash } = new QuasiURL(url);
  let { origin: patternOrigin, pathname: patternPathname } = new QuasiURL(
    pattern,
  );

  if (origin !== patternOrigin) return null;

  if (urlSchema === null) return url === pattern ? { hash } : null;

  let matchPattern = matchParams(patternPathname);
  let paramsMatch = matchPattern(pathname);

  if (paramsMatch === false) return null;

  let params = paramsMatch.params;
  let query = Object.fromEntries(new URLSearchParams(search));

  let parseResult = parseObject({ params, query }, urlSchema);

  if (parseResult === null) return null;

  return { ...parseResult, hash };
}
