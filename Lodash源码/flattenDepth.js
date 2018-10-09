
function baseFlatten(array, depth, predicted, isStrict, result) {
    var index = -1,
        length = array.length;
    predicate || (predicate = isFlattenable);
    result || (result = []);
    while (++index < length) {
        var value = array[index];
        if (depth > 0 && predicate(value)) {
            if (depth > 1) {
                baseFlatten(value, depth - 1, predicate, isStrict, result);
            } else {
                arrayPush(result, value);
            }
        } else if (!isStrict) {
            result[result.length] = value;
        }
    }
    return result;
}
function flattenDepth(array, depth) {
    var length = array == null ? 0 : array.length;
    if (!length) {
        return [];
    }
    depth = depth === undefined ? 1 : toInteger(depth);
    return baseFlatten(array, depth);
}
var array = [1, [2, [3, [4]], 5]];

_.flattenDepth(array, 1);
// => [1, 2, [3, [4]], 5]

_.flattenDepth(array, 2);
// => [1, 2, 3, [4], 5]