type ZodV4 = {
    _zod: {
        output: unknown;
    };
    parse: (value: any, options?: any) => any;
}

type ZodV3 = {
    _output: unknown;
    parse: (value: any, options?: any) => any;
};

type Yup = {
    __outputType: unknown;
    cast: (value: any, options?: any) => any;
};

export type Schema = ZodV4 | ZodV3 | Yup;
