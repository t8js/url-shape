import type { Satisfies } from "./Satisfies.ts";
import type { URLComponents } from "./URLComponents.ts";

export type BaselineURLComponents = Satisfies<
  URLComponents,
  {
    params?: Record<string, string | undefined> | undefined;
    query?: Record<string, string | undefined> | undefined;
  }
>;
