_.groupBy([6.1, 4.2, 6.3], Math.floor);
// => { '4': [4.2], '6': [6.1, 6.3] }

// The `_.property` iteratee shorthand.
_.groupBy(['one', 'two', 'three'], 'length');
// => { '3': ['one', 'two'], '5': ['three'] }
function baseAssignValue(object, key, value) {
    if (key == '__proto__' && defineProperty) {
        defineProperty(object, key, {
            'configurable': true,
            'enumerable': true,
            'value': value,
            'writable': true
        });
    } else {
        object[key] = value;
    }
}
var groupBy = createAggregator(function (result, value, key) {
    if (hasOwnProperty.call(result, key)) {
        result[key].push(value);
    } else {
        baseAssignValue(result, key, [value]);
    }
});
function createAggregator(setter, initializer) {
    return function (collection, iteratee) {
        var func = isArray(collection) ? arrayAggregator : baseAggregator,
            accumulator = initializer ? initializer() : {};

        return func(collection, setter, getIteratee(iteratee, 2), accumulator);
    };
}
function arrayAggregator(array, setter, iteratee, accumulator) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
        var value = array[index];
        setter(accumulator, value, iteratee(value), array);
    }
    return accumulator;
}
function baseAggregator(collection, setter, iteratee, accumulator) {
    baseEach(collection, function (value, key, collection) {
        setter(accumulator, value, iteratee(value), collection);
    });
    return accumulator;
}

