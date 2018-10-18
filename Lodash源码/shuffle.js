function shuffle(collection) {
    var func = isArray(collection) ? arrayShuffle : baseShuffle;
    return func(collection);
}
function arrayShuffle(array) {
    return shuffleSelf(copyArray(array));
}
function shuffleSelf(array, size) {
    var index = -1,
        length = array.length,
        lastIndex = length - 1;

    size = size === undefined ? length : size;
    while (++index < size) {
        var rand = baseRandom(index, lastIndex),
            value = array[rand];

        array[rand] = array[index];
        array[index] = value;
    }
    array.length = size;
    return array;
}
_.shuffle([1, 2, 3, 4]);
// => [4, 1, 3, 2]