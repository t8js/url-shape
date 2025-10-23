import type { StandardSchemaV1 } from "@standard-schema/spec";
import type { URLSchema } from "./URLSchema";

export type UnpackedURLSchema<S extends URLSchema> =
  StandardSchemaV1.InferOutput<S>;
