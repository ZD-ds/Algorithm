var zipWith = baseRest(function (arrays) {
    var length = arrays.length,
        iteratee = length > 1 ? arrays[length - 1] : undefined;

    iteratee = typeof iteratee == 'function' ? (arrays.pop(), iteratee) : undefined;
    return unzipWith(arrays, iteratee);
});
function unzipWith(array, iteratee) {
    if (!(array && array.length)) {
        return [];
    }
    var result = unzip(array);
    if (iteratee == null) {
        return result;
    }
    return arrayMap(result, function (group) {
        return apply(iteratee, undefined, group);
    });
}