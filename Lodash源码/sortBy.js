var users = [
    { 'user': 'fred', 'age': 48 },
    { 'user': 'barney', 'age': 36 },
    { 'user': 'fred', 'age': 40 },
    { 'user': 'barney', 'age': 34 }
];
var sortBy = baseRest(function (collection, iteratees) {
    if (collection == null) {
        return [];
    }
    var length = iteratees.length;
    if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
        iteratees = [];
    } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
        iteratees = [iteratees[0]];
    }
    return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
});
function baseOrderBy(collection, iteratees, orders) {
    var index = -1;
    iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(getIteratee()));

    var result = baseMap(collection, function (value, key, collection) {
        var criteria = arrayMap(iteratees, function (iteratee) {
            return iteratee(value);
        });
        return { 'criteria': criteria, 'index': ++index, 'value': value };
    });

    return baseSortBy(result, function (object, other) {
        return compareMultiple(object, other, orders);
    });
}
_.sortBy(users, [function (o) { return o.user; }]);
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]

_.sortBy(users, ['user', 'age']);
  // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]