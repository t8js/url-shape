import type { Pattern } from "./types/Pattern";
import type { URLMapSchema } from "./types/URLMapSchema";
import type { URLMapSchemaEntry } from "./types/URLMapSchemaEntry";
import { getURLBuilder } from "./utils/getURLBuilder";
import { isPatternObject } from "./utils/isPatternObject";
import { match } from "./utils/match";
import { validate } from "./utils/validate";

export function createURLSchema<S extends URLMapSchema>(schema: S) {
  return {
    url: getURLBuilder<S>(schema),
    validate: (url: string) => validate<S>(url, schema),
    match: <P extends keyof S>(pattern: Pattern<S, P>, url: string) => {
      let stringPattern = isPatternObject(pattern) ? pattern.href : pattern;

      return match<S, P>(
        url,
        stringPattern as string,
        (schema as S)?.[stringPattern as P] as URLMapSchemaEntry<S, P>,
      );
    },
  };
}
