function sortedLastIndexOf(array, value) {
    var length = array == null ? 0 : array.length;
    if (length) {
        var index = baseSortedIndex(array, value, true) - 1;
        if (eq(array[index], value)) {
            return index;
        }
    }
    return -1;
}

_.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
// => 3