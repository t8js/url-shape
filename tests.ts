import {z} from 'zod';
import {createURLSchema} from '.';

let k = 0;

function assert(predicate: boolean) {
    let n = `00${++k}`.slice(-3);

    if (predicate)
        console.log(n, 'passed');
    else {
        console.error(n, 'failed');
        console.error();
        console.error('[!] failed');
        process.exit(1);
    }
}

let {url} = createURLSchema({
    '/': null,
    '/sections/:id': {
        params: z.object({
            id: z.coerce.number(),
        }),
    },
    '/search': {
        query: z.object({
            term: z.string(),
            view: z.optional(z.enum(['full', 'compact'])),
        }),
    },
});

assert(url('/').toString() === '/');
assert(url('/sections/:id', {params: {id: 1}}).toString() === '/sections/1');
assert(url('/sections/:id').toString() === '/sections/:id');

assert(JSON.stringify(url('/sections/:id').exec('/sections/42')?.params) === '{"id":42}');
assert(JSON.stringify(url('/sections/:id').exec('/sections/42')?.query) === '{}');
assert(url('/sections/:id').exec('/x/42') === null);
assert(url('/').exec('/x') === null);

assert(url('/search').toString() === '/search');
assert(url('/search', {query: {term: 'x'}}).toString() === '/search?term=x');
assert(url('/search', {query: {term: 'x', view: 'full'}}).toString() === '/search?term=x&view=full');

assert(url('/search').exec('/x') === null);
assert(JSON.stringify(url('/search').exec('/search?term=test')?.query) === '{"term":"test"}');
assert(JSON.stringify(url('/search').exec('/search?term=test')?.params) === '{}');
assert(JSON.stringify(url('/search').exec('/search?term=test&view=full')?.query) === '{"term":"test","view":"full"}');
assert(url('/search').exec('/search?term=test&view=fulll') === null);
assert(JSON.stringify(url('/search').exec('/search?term=null&view=compact')?.query) === '{"term":"null","view":"compact"}');
assert(url('/search').exec('/search?view=compact') === null);

let {url: url2} = createURLSchema(null);

assert(url2('/').toString() === '/');
assert(url2('/sections/:id', {params: {id: 'x'}}).toString() === '/sections/x');

console.log();
console.log('passed');
