_.some([null, 0, 'yes', false], Boolean);
// => true
function some(collection, predicate, guard) {
    var func = isArray(collection) ? arraySome : baseSome;
    if (guard && isIterateeCall(collection, predicate, guard)) {
        predicate = undefined;
    }
    return func(collection, getIteratee(predicate, 3));
}
function isIterateeCall(value, index, object) {
    if (!isObject(object)) {
        return false;
    }
    var type = typeof index;
    if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
    ) {
        return eq(object[index], value);
    }
    return false;
}
function baseSome(collection, predicate) {
    var result;

    baseEach(collection, function (value, index, collection) {
        result = predicate(value, index, collection);
        return !result;
    });
    return !!result;
}

function arraySome(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
        if (predicate(array[index], index, array)) {
            return true;
        }
    }
    return false;
}
function baseSome(collection, predicate) {
    var result;

    baseEach(collection, function (value, index, collection) {
        result = predicate(value, index, collection);
        return !result;
    });
    return !!result;
}

var users = [
    { 'user': 'barney', 'active': true },
    { 'user': 'fred', 'active': false }
];

// The `_.matches` iteratee shorthand.
_.some(users, { 'user': 'barney', 'active': false });
// => false

// The `_.matchesProperty` iteratee shorthand.
_.some(users, ['active', false]);
// => true

// The `_.property` iteratee shorthand.
_.some(users, 'active');
// => true