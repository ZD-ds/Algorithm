function head(array) {
    return (array && array.length) ? array[0] : undefined;
}
_.head([1, 2, 3]);
// => 1

_.head([]);
// => undefined