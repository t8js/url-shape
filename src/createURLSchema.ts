import type { BaselineURLComponents } from "./types/BaselineURLComponents";
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

  return {
    /**
     * Returns a type-aware URL builder.
     */
    url: <P extends keyof S>(
      pattern: S extends null ? string : P,
      data?: S extends null
        ? BaselineURLComponents
        : UnpackedURLSchema<NonNullable<S>[P]>,
    ) => {
      type URLShape = NonNullable<typeof data>;

      type MatchShape = {
        params: S extends null
          ? BaselineURLComponents["params"]
          : UnpackedURLSchema<NonNullable<S>[P]> extends {
                params?: Record<string, unknown>;
              }
            ? UnpackedURLSchema<NonNullable<S>[P]>["params"]
            : undefined;
        query: S extends null
          ? BaselineURLComponents["query"]
          : UnpackedURLSchema<NonNullable<S>[P]> extends {
                query?: Record<string, unknown>;
              }
            ? UnpackedURLSchema<NonNullable<S>[P]>["query"]
            : undefined;
        hash: string;
      };

      let url = build(String(pattern), data);
      let urlSchema = (schema as S)?.[pattern] as S extends null
        ? undefined
        : NonNullable<S>[P];

      return {
        _pattern: pattern,
        _schema: urlSchema,
        href: url,
        exec: (location: string) => {
          return match(location, url, urlSchema) as MatchShape | null;
        },
        compile: (input: URLShape | null | undefined) =>
          build(String(pattern), input),
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
