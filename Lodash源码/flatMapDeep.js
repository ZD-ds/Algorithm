function duplicate(n) {
    return [[[n, n]]];
}

_.flatMapDeep([1, 2], duplicate);
// => [1, 1, 2, 2]
function flatMapDeep(collection, iteratee) {
    return baseFlatten(map(collection, iteratee), INFINITY);
}