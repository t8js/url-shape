import type { BaselineURLComponents } from "./types/BaselineURLComponents";
import type { EmptyURLComponents } from "./types/EmptyURLComponents";
import type { UnpackedURLSchema } from "./types/UnpackedURLSchema";
import type { URLSchemaMap } from "./types/URLSchemaMap";
import { build } from "./utils/build";
import { match } from "./utils/match";

export function createURLSchema<S extends URLSchemaMap | null>(schema: S) {
  if (
    schema !== null &&
    Object.values(schema).some((entry) => !("~standard" in entry))
  )
    throw new TypeError(
      "Malformed URL schema. All entries should conform to the Standard Schema specification. See https://standardschema.dev/",
    );

  type URLShape<P extends keyof S> = S extends null
    ? BaselineURLComponents
    : UnpackedURLSchema<NonNullable<S>[P]>;

  type MatchShape<P extends keyof S> = URLShape<P> &
    Omit<EmptyURLComponents, keyof URLShape<P>> & {
      hash: string;
    };

  return {
    /**
     * Returns a type-aware URL builder.
     */
    url: <P extends keyof S>(
      pattern: S extends null ? string : P,
      data?: URLShape<P>,
    ) => {
      let url = build(String(pattern), data);
      let urlSchema = (schema as S)?.[pattern]!;

      return {
        _pattern: pattern,
        _schema: urlSchema,
        href: url,
        exec: (location: string) => {
          return match(location, url, urlSchema) as MatchShape<P> | null;
        },
        compile: (input: URLShape<P>) => build(String(pattern), input),
        toString: () => url,
      };
    },
    /**
     * Checks whether `url` matches any entries in the schema.
     */
    validate: (url: string) => {
      if (!schema) return true;

      for (let [urlPattern, urlSchema] of Object.entries(schema)) {
        if (match(url, urlPattern, urlSchema) !== null) return true;
      }

      return false;
    },
  };
}
