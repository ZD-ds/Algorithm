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
var xorWith = baseRest(function (arrays) {
    var comparator = last(arrays);
    comparator = typeof comparator == 'function' ? comparator : undefined;
    return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator);
});

var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];

_.xorWith(objects, others, _.isEqual);
// => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]