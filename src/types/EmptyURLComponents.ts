import type { Satisfies } from "./Satisfies";
import type { URLComponents } from "./URLComponents";

export type EmptyURLComponents = Satisfies<
  URLComponents,
  {
    params: undefined;
    query: undefined;
  }
>;
