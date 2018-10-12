var objects = [{ 'x': 4 }, { 'x': 5 }];

_.sortedLastIndexBy(objects, { 'x': 4 }, function (o) { return o.x; });
// => 1

// The `_.property` iteratee shorthand.
_.sortedLastIndexBy(objects, { 'x': 4 }, 'x');
// => 1
function sortedLastIndexBy(array, value, iteratee) {
    return baseSortedIndexBy(array, value, getIteratee(iteratee, 2), true);
}
