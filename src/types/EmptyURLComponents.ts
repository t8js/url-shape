import { Satisfies } from "./Satisfies";
import { URLComponents } from "./URLComponents";

export type EmptyURLComponents = Satisfies<URLComponents, {
  params: undefined;
  query: undefined;
}>;
