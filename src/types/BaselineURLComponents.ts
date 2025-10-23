import type { Satisfies } from "./Satisfies";
import type { URLComponents } from "./URLComponents";

export type BaselineURLComponents = Satisfies<
  URLComponents,
  {
    params?: Record<string, string | undefined> | undefined;
    query?: Record<string, string | undefined> | undefined;
  }
>;
