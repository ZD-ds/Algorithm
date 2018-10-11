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
function baseIndexOf(array, value, fromIndex) {
    return value === value
        ? strictIndexOf(array, value, fromIndex)
        : baseFindIndex(array, baseIsNaN, fromIndex);
}

function baseIndexOfWith(array, value, fromIndex, comparator) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
        if (comparator(array[index], value)) {
            return index;
        }
    }
    return -1;
}

function basePullAll(array, values, iteratee, comparator) {
    var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
        index = -1,
        length = values.length,
        seen = array;

    if (array === values) {
        values = copyArray(values);
    }
    if (iteratee) {
        seen = arrayMap(array, baseUnary(iteratee));
    }
    while (++index < length) {
        var fromIndex = 0,
            value = values[index],
            computed = iteratee ? iteratee(value) : value;

        while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
            if (seen !== array) {
                splice.call(seen, fromIndex, 1);
            }
            splice.call(array, fromIndex, 1);
        }
    }
    return array;
}
function pullAllWith(array, values, comparator) {
    return (array && array.length && values && values.length)
        ? basePullAll(array, values, undefined, comparator)
        : array;
}
var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];

_.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
console.log(array);
// => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]