import type { Schema, UnpackedSchema } from "unpack-schema";
import type { URLMapSchema } from "../types/URLMapSchema";

type R = Schema<Record<string, unknown>>;
type RX = Schema<Record<string, unknown> | undefined>;

export type UnpackedParamsSchema<
  S extends URLMapSchema,
  P extends keyof S = keyof S,
> = S extends null
  ? Record<string, string | string[] | undefined>
  : NonNullable<S>[P] extends { params?: R | RX }
    ? UnpackedSchema<NonNullable<NonNullable<S>[P]>["params"]>
    : Record<string, never>;
