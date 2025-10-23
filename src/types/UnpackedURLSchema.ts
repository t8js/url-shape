import { StandardSchemaV1 } from "@standard-schema/spec";
import { URLSchema } from "./URLSchema";

export type UnpackedURLSchema<S extends URLSchema> = StandardSchemaV1.InferOutput<S>;
