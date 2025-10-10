[![npm](https://flat.badgen.net/npm/v/url-shape?labelColor=345&color=46e)](https://www.npmjs.com/package/url-shape) ![Lightweight](https://flat.badgen.net/bundlephobia/minzip/url-shape/?labelColor=345&color=46e&r=0) ![TypeScript ✓](https://flat.badgen.net/badge/TypeScript/✓?labelColor=345&color=345) ![browser ✓](https://flat.badgen.net/badge/browser/✓?labelColor=345&color=345) ![node ✓](https://flat.badgen.net/badge/node/✓?labelColor=345&color=345)

# url-shape

*Type-safe schema-based URL builder*

Installation: `npm i url-shape`

## Creating a URL schema with Zod or Yup

```ts
import { createURLSchema } from "url-shape";
import { z } from "zod";

export const { url, match, validate } = createURLSchema({
  "/": null, // goes without parameters
  "/sections/:id": {
    params: z.object({
      id: z.coerce.number(),
    }),
  },
  "/search": {
    query: z.object({
      term: z.string(),
      view: z.optional(z.enum(["full", "compact"])),
    }),
  },
});
```

With Zod, remember to use the `.coerce` part in the schema for non-string parameters so that string URL components are converted to the preferred types.

## Using a URL schema

Use the functions returned from `createURLSchema()` to build, match, and validate URLs in a type-safe manner. A type-aware code editor will highlight typos in the URLs and type mismatches in their parameters.

```ts
url("/sections/:id", { params: { id: 10 } }).href // "/sections/10"
url("/sections/:id", { params: { id: 10 } }).toString() // "/sections/10"
String(url("/sections/:id", { params: { id: 10 } })) // "/sections/10"

url("/sections/:id").exec("/sections/42") // { params: { id: 42 } }
url("/sections/:id").exec("/x/42") // null

url("/sections/:id").compile({ params: { id: 10 } }) // "/sections/10"
url("/search").compile({ query: { term: "shape" } }) // "/search?term=shape"

match("/sections/:id", "/sections/10") // { params: { id: 10 } }
match("/sections/:id", "/x") // null

validate("/sections/10") // true, found in the schema
validate("/x") // false, not found in the schema
```

## Null schema

By having `null` as a URL schema, the URL builder can be used without schema validation:

```ts
const { url, match, validate } = createURLSchema(null);

url("/sections/:id", { params: { id: "x" } }) // "/sections/x"
match("/x/:name", "/x/intro") // { params: { name: "intro" } }
validate("/x") // true, all URLs are fine when there's no schema
```
