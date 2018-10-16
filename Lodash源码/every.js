function every(collection, predicate, guard) {
    var func = isArray(collection) ? arrayEvery : baseEvery;
    if (guard && isIterateeCall(collection, predicate, guard)) {
        predicate = undefined;
    }
    return func(collection, getIteratee(predicate, 3));
}
function arrayEvery(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
        if (!predicate(array[index], index, array)) {
            return false;
        }
    }
    return true;
}
_.every([true, 1, null, 'yes'], Boolean);
// => false

var users = [
    { 'user': 'barney', 'age': 36, 'active': false },
    { 'user': 'fred', 'age': 40, 'active': false }
];

// The `_.matches` iteratee shorthand.
_.every(users, { 'user': 'barney', 'active': false });
// => false

// The `_.matchesProperty` iteratee shorthand.
_.every(users, ['active', false]);
// => true

// The `_.property` iteratee shorthand.
_.every(users, 'active');
// => false