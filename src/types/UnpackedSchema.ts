export type UnpackedSchema<
    T,
    Fallback extends Record<string, unknown> | string = Record<string, unknown>,
> = T extends {_zod: {output: Record<string, unknown> | string}}
    ? T['_zod']['output']
    : T extends {_output: Record<string, unknown> | string}
      ? T['_output']
    : T extends {__outputType: Record<string, unknown> | string}
      ? T['__outputType']
      : Fallback;
