import type {Schema} from './Schema';

export type URLSchema = {
    params?: Schema;
    query?: Schema;
    // hash?: Schema;
} | null;
