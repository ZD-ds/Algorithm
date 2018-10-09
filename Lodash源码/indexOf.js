function strictIndexOf(array, value, fromIndex) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
        if (array[index] === value) {
            return index;
        }
    }
    return -1;
}
function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);

    while ((fromRight ? index-- : ++index < length)) {
        if (predicate(array[index], index, array)) {
            return index;
        }
    }
    return -1;
}
function baseIsNaN(value) {
    return value !== value;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
    return value === value
        ? strictIndexOf(array, value, fromIndex)
        : baseFindIndex(array, baseIsNaN, fromIndex);
}

function indexOf(array, value, fromIndex) {
    var length = array == null ? 0 : array.length;
    if (!length) {
        return -1;
    }
    var index = fromIndex == null ? 0 : toInteger(fromIndex);
    if (index < 0) {
        index = nativeMax(length + index, 0);
    }
    return baseIndexOf(array, value, index);
}
_.indexOf([1, 2, 1, 2], 2);
// => 1

// Search from the `fromIndex`.
_.indexOf([1, 2, 1, 2], 2, 2);
// => 3