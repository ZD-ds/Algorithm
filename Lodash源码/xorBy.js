function baseDifference(array, values, iteratee, comparator) {
    var index = -1,
        includes = arrayIncludes,
        isCommon = true,
        length = array.length,
        result = [],
        valuesLength = values.length;

    if (!length) {
        return result;
    }
    if (iteratee) {
        values = arrayMap(values, baseUnary(iteratee));
    }
    if (comparator) {
        includes = arrayIncludesWith;
        isCommon = false;
    }
    else if (values.length >= LARGE_ARRAY_SIZE) {
        includes = cacheHas;
        isCommon = false;
        values = new SetCache(values);
    }
    outer:
    while (++index < length) {
        var value = array[index],
            computed = iteratee == null ? value : iteratee(value);

        value = (comparator || value !== 0) ? value : 0;
        if (isCommon && computed === computed) {
            var valuesIndex = valuesLength;
            while (valuesIndex--) {
                if (values[valuesIndex] === computed) {
                    continue outer;
                }
            }
            result.push(value);
        }
        else if (!includes(values, computed, comparator)) {
            result.push(value);
        }
    }
    return result;
}

/**
 * The base implementation of methods like `_.xor`, without support for
 * iteratee shorthands, that accepts an array of arrays to inspect.
 *
 * @private
 * @param {Array} arrays The arrays to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of values.
 */
function baseXor(arrays, iteratee, comparator) {
    var length = arrays.length;
    if (length < 2) {
        return length ? baseUniq(arrays[0]) : [];
    }
    var index = -1,
        result = Array(length);

    while (++index < length) {
        var array = arrays[index],
            othIndex = -1;

        while (++othIndex < length) {
            if (othIndex != index) {
                result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
            }
        }
    }
    return baseUniq(baseFlatten(result, 1), iteratee, comparator);
}
var xorBy = baseRest(function (arrays) {
    var iteratee = last(arrays);
    if (isArrayLikeObject(iteratee)) {
        iteratee = undefined;
    }
    return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee, 2));
});

_.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
// => [1.2, 3.4]

// The `_.property` iteratee shorthand.
_.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 2 }]