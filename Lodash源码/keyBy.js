
var array = [
    { 'dir': 'left', 'code': 97 },
    { 'dir': 'right', 'code': 100 }
];

_.keyBy(array, function (o) {
    return String.fromCharCode(o.code);
});
// => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }

_.keyBy(array, 'dir');
// => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
var keyBy = createAggregator(function (result, value, key) {
    baseAssignValue(result, key, value);
});
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
