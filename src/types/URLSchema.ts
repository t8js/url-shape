import type {Schema} from 'unpack-schema';

export type URLSchema = {
    params?: Schema;
    query?: Schema;
    // hash?: Schema;
} | null;
