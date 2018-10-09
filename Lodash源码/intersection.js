function arrayIncludes(array, value) {
    var length = array == null ? 0 : array.length;
    return !!length && baseIndexOf(array, value, 0) > -1;
}

/**
 * The base implementation of methods like `_.intersection`, without support
 * for iteratee shorthands, that accepts an array of arrays to inspect.
 *
 * @private
 * @param {Array} arrays The arrays to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of shared values.
 */
function baseIntersection(arrays, iteratee, comparator) {
    var includes = comparator ? arrayIncludesWith : arrayIncludes,
        length = arrays[0].length,
        othLength = arrays.length,
        othIndex = othLength,
        caches = Array(othLength),
        maxLength = Infinity,
        result = [];

    while (othIndex--) {
        var array = arrays[othIndex];
        if (othIndex && iteratee) {
            array = arrayMap(array, baseUnary(iteratee));
        }
        maxLength = nativeMin(array.length, maxLength);
        caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
            ? new SetCache(othIndex && array)
            : undefined;
    }
    array = arrays[0];

    var index = -1,
        seen = caches[0];

    outer:
    while (++index < length && result.length < maxLength) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        value = (comparator || value !== 0) ? value : 0;
        if (!(seen
            ? cacheHas(seen, computed)
            : includes(result, computed, comparator)
        )) {
            othIndex = othLength;
            while (--othIndex) {
                var cache = caches[othIndex];
                if (!(cache
                    ? cacheHas(cache, computed)
                    : includes(arrays[othIndex], computed, comparator))
                ) {
                    continue outer;
                }
            }
            if (seen) {
                seen.push(computed);
            }
            result.push(value);
        }
    }
    return result;
}
var intersection = baseRest(function (arrays) {
    var mapped = arrayMap(arrays, castArrayLikeObject);
    return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped)
        : [];
});
_.intersection([2, 1], [2, 3]);
// => [2]
//先是第一个数组的第一个值和result比较是否包含，result有了则跳过，没有则继续进行判断第二个数组是否包含，没有包含则继续第一个数组循环，
//包含则把数据放入result数组