type ZodV4 = {
    _zod: {
        output: unknown;
    };
    parse: (value: unknown, options?: object | undefined) => unknown;
};

type ZodV3 = {
    _output: unknown;
    parse: (value: unknown, options?: object | undefined) => unknown;
};

type Yup = {
    __outputType: unknown;
    cast: (value: unknown, options?: object | undefined) => unknown;
};

export type Schema = ZodV4 | ZodV3 | Yup;
