function filter(collection, predicate) {
    var func = isArray(collection) ? arrayFilter : baseFilter;
    return func(collection, getIteratee(predicate, 3));
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
var users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred', 'age': 40, 'active': false }
];

_.filter(users, function (o) { return !o.active; });
// => objects for ['fred']

// The `_.matches` iteratee shorthand.
_.filter(users, { 'age': 36, 'active': true });
// => objects for ['barney']

// The `_.matchesProperty` iteratee shorthand.
_.filter(users, ['active', false]);
// => objects for ['fred']

// The `_.property` iteratee shorthand.
_.filter(users, 'active');
  // => objects for ['barney']