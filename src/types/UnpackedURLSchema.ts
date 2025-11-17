import type { StandardSchemaV1 } from "@standard-schema/spec";
import type { URLSchema } from "./URLSchema.ts";

export type UnpackedURLSchema<S extends URLSchema> =
  StandardSchemaV1.InferOutput<S>;
