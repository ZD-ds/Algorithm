
function sortedUniqBy(array, iteratee) {
    return (array && array.length)
        ? baseSortedUniq(array, getIteratee(iteratee, 2))
        : [];
}
function baseSortedUniq(array, iteratee) {
    var index = -1,
        length = array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        if (!index || !eq(computed, seen)) {
            var seen = computed;
            result[resIndex++] = value === 0 ? 0 : value;
        }
    }
    return result;
}
_.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
// => [1.1, 2.3