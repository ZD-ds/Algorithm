var users = [
    { 'user': 'barney', 'age': 36, 'active': false },
    { 'user': 'fred', 'age': 40, 'active': true }
];

_.reject(users, function (o) { return !o.active; });
// => objects for ['fred']

// The `_.matches` iteratee shorthand.
_.reject(users, { 'age': 40, 'active': true });
// => objects for ['barney']

// The `_.matchesProperty` iteratee shorthand.
_.reject(users, ['active', false]);
// => objects for ['fred']

// The `_.property` iteratee shorthand.
_.reject(users, 'active');
// => objects for ['barney']


function reject(collection, predicate) {
    var func = isArray(collection) ? arrayFilter : baseFilter;
    return func(collection, negate(getIteratee(predicate, 3)));
}

function arrayFilter(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
            result[resIndex++] = value;
        }
    }
    return result;
}
function baseFilter(collection, predicate) {
    var result = [];
    baseEach(collection, function (value, index, collection) {
        if (predicate(value, index, collection)) {
            result.push(value);
        }
    });
    return result;
}
function negate(predicate) {
    if (typeof predicate != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    return function () {
        var args = arguments;
        switch (args.length) {
            case 0: return !predicate.call(this);
            case 1: return !predicate.call(this, args[0]);
            case 2: return !predicate.call(this, args[0], args[1]);
            case 3: return !predicate.call(this, args[0], args[1], args[2]);
        }
        return !predicate.apply(this, args);
    };
}
function arrayFilter(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];
    while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
            result[resIndex++] = value;
        }
    }
    return result;
}
