/**
   * The base implementation of `_.pullAt` without support for individual
   * indexes or capturing the removed elements.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {number[]} indexes The indexes of elements to remove.
   * @returns {Array} Returns `array`.
   */
function basePullAt(array, indexes) {
    var length = array ? indexes.length : 0,
        lastIndex = length - 1;

    while (length--) {
        var index = indexes[length];
        if (length == lastIndex || index !== previous) {
            var previous = index;
            if (isIndex(index)) {
                splice.call(array, index, 1);
            } else {
                //对于类数组对象的处理
                baseUnset(array, index);
            }
        }
    }
    return array;
}

/**
   * The base implementation of `_.at` without support for individual paths.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {string[]} paths The property paths to pick.
   * @returns {Array} Returns the picked elements.
   */
function baseAt(object, paths) {
    var index = -1,
        length = paths.length,
        result = Array(length),
        skip = object == null;

    while (++index < length) {
        result[index] = skip ? undefined : get(object, paths[index]);
    }
    return result;
}
var pullAt = flatRest(function (array, indexes) {
    var length = array == null ? 0 : array.length,
        result = baseAt(array, indexes);

    basePullAt(array, arrayMap(indexes, function (index) {
        return isIndex(index, length) ? +index : index;
    }).sort(compareAscending));

    return result;
});
var array = ['a', 'b', 'c', 'd'];
var pulled = _.pullAt(array, [1, 3]);

console.log(array);
// => ['a', 'c']

console.log(pulled);
// => ['b', 'd']