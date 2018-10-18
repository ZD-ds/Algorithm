function sampleSize(collection, n, guard) {
    if ((guard ? isIterateeCall(collection, n, guard) : n === undefined)) {
        n = 1;
    } else {
        n = toInteger(n);
    }
    var func = isArray(collection) ? arraySampleSize : baseSampleSize;
    return func(collection, n);
}
function arraySampleSize(array, n) {
    return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
}
function baseClamp(number, lower, upper) {
    if (number === number) {
        if (upper !== undefined) {
            number = number <= upper ? number : upper;
        }
        if (lower !== undefined) {
            number = number >= lower ? number : lower;
        }
    }
    return number;
}
function copyArray(source, array) {
    var index = -1,
        length = source.length;

    array || (array = Array(length));
    while (++index < length) {
        array[index] = source[index];
    }
    return array;
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
_.sampleSize([1, 2, 3], 2);

// => [3, 1]

_.sampleSize([1, 2, 3], 4);
// => [2, 3, 1]