import { Satisfies } from "./Satisfies";
import { URLComponents } from "./URLComponents";

export type BaselineURLComponents = Satisfies<URLComponents, {
  params?: Record<string, string | undefined> | undefined;
  query?: Record<string, string | undefined> | undefined;
}>;
