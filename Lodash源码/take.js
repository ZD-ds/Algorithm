function take(array, n, guard) {
    if (!(array && array.length)) {
        return [];
    }
    n = (guard || n === undefined) ? 1 : toInteger(n);
    return baseSlice(array, 0, n < 0 ? 0 : n);
}
_.take([1, 2, 3]);
// => [1]

_.take([1, 2, 3], 2);
// => [1, 2]

_.take([1, 2, 3], 5);
// => [1, 2, 3]

_.take([1, 2, 3], 0);
// => []