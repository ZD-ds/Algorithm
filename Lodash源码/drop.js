
/**
   * The base implementation of `_.slice` without an iteratee call guard.
   *
   * @private
   * @param {Array} array The array to slice.
   * @param {number} [start=0] The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the slice of `array`.
   */
function baseSlice(array, start, end) {
    var index = -1,
        length = array.length;

    if (start < 0) {
        start = -start > length ? 0 : (length + start);
    }
    end = end > length ? length : end;
    if (end < 0) {
        end += length;
    }
    length = start > end ? 0 : ((end - start) >>> 0);
    start >>>= 0;

    var result = Array(length);
    while (++index < length) {
        result[index] = array[index + start];
    }
    return result;
}

function drop(array, n, guard) {
    var length = array == null ? 0 : array.length;
    if (!length) {
        return [];
    }
    n = (guard || n === undefined) ? 1 : toInteger(n);
    return baseSlice(array, n < 0 ? 0 : n, length);
}
_.drop([1, 2, 3]);
// => [2, 3]

_.drop([1, 2, 3], 2);
// => [3]

_.drop([1, 2, 3], 5);
// => []

_.drop([1, 2, 3], 0);
// => [1, 2, 3]