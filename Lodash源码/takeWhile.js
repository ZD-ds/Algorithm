/**
 * The base implementation of methods like `_.dropWhile` and `_.takeWhile`
 * without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to query.
 * @param {Function} predicate The function invoked per iteration.
 * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Array} Returns the slice of `array`.
 */
function baseWhile(array, predicate, isDrop, fromRight) {
    var length = array.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length) &&
        predicate(array[index], index, array)) { }

    return isDrop
        ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
        : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
}
function takeWhile(array, predicate) {
    return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3))
        : [];
}

var users = [
    { 'user': 'barney', 'active': false },
    { 'user': 'fred', 'active': false },
    { 'user': 'pebbles', 'active': true }
];

_.takeWhile(users, function (o) { return !o.active; });
// => objects for ['barney', 'fred']

// The `_.matches` iteratee shorthand.
_.takeWhile(users, { 'user': 'barney', 'active': false });
// => objects for ['barney']

// The `_.matchesProperty` iteratee shorthand.
_.takeWhile(users, ['active', false]);
// => objects for ['barney', 'fred']

// The `_.property` iteratee shorthand.
_.takeWhile(users, 'active');
  // => []