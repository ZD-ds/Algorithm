_.findLast([1, 2, 3, 4], function (n) {
    return n % 2 == 1;
});
// => 3
var findLast = createFind(findLastIndex);
function findLastIndex(array, predicate, fromIndex) {
    var length = array == null ? 0 : array.length;
    if (!length) {
        return -1;
    }
    var index = length - 1;
    if (fromIndex !== undefined) {
        index = toInteger(fromIndex);
        index = fromIndex < 0
            ? nativeMax(length + index, 0)
            : nativeMin(index, length - 1);
    }
    return baseFindIndex(array, getIteratee(predicate, 3), index, true);
}