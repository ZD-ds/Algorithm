function forEachRight(collection, iteratee) {
    var func = isArray(collection) ? arrayEachRight : baseEachRight;
    return func(collection, getIteratee(iteratee, 3));
}
function baseForOwnRight(object, iteratee) {
    return object && baseForRight(object, iteratee, keys);
}
var baseEachRight = createBaseEach(baseForOwnRight, true);
function arrayEachRight(array, iteratee) {
    var length = array == null ? 0 : array.length;

    while (length--) {
        if (iteratee(array[length], length, array) === false) {
            break;
        }
    }
    return array;
}

_.forEachRight([1, 2], function (value) {
    console.log(value);
});
  // => Logs `2` then `1`.