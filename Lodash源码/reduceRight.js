var array = [[0, 1], [2, 3], [4, 5]];

_.reduceRight(array, function (flattened, other) {
    return flattened.concat(other);
}, []);
// => [4, 5, 2, 3, 0, 1]
function reduceRight(collection, iteratee, accumulator) {
    var func = isArray(collection) ? arrayReduceRight : baseReduce,
        initAccum = arguments.length < 3;

    return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
}