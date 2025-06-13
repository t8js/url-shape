import type {URLSchema} from './URLSchema';
import type {UnpackedSchema} from './UnpackedSchema';

// export type UnpackedURLSchema<T extends URLSchema> = T extends null
//     ? void
//     : {
//           params?: NonNullable<T> extends {params: unknown}
//               ? UnpackedSchema<NonNullable<T>['params']>
//               : never;
//           query?: NonNullable<T> extends {query: unknown}
//               ? UnpackedSchema<NonNullable<T>['query']>
//               : never;
//           // hash?: UnpackedSchema<NonNullable<T>['hash'], string>;
//       };

export type UnpackedURLSchema<T extends URLSchema> = T extends null
    ? undefined
    : NonNullable<T> extends {params: unknown; query: unknown}
      ? {
            params: UnpackedSchema<NonNullable<T>['params']>;
            query: UnpackedSchema<NonNullable<T>['query']>;
        }
      : NonNullable<T> extends {params: unknown}
        ? {
              params: UnpackedSchema<NonNullable<T>['params']>;
          }
        : NonNullable<T> extends {query: unknown}
          ? {
                query: UnpackedSchema<NonNullable<T>['query']>;
            }
          : undefined;
