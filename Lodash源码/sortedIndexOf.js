function sortedIndexOf(array, value) {
    var length = array == null ? 0 : array.length;
    if (length) {
        var index = baseSortedIndex(array, value);
        if (index < length && eq(array[index], value)) {
            return index;
        }
    }
    return -1;
}
_.sortedIndexOf([4, 5, 5, 5, 6], 5);
// => 1
//该插入的位置和是否包含这个元素