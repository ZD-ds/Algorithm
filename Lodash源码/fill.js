function baseFill(array, value, start, end) {
    var length = array.length;

    start = toInteger(start);
    if (start < 0) {
        start = -start > length ? 0 : (length + start);
    }
    end = (end === undefined || end > length) ? length : toInteger(end);
    if (end < 0) {
        end += length;
    }
    end = start > end ? 0 : toLength(end);
    while (start < end) {
        array[start++] = value;
    }
    return array;
}
function fill(array, value, start, end) {
    var length = array == null ? 0 : array.length;
    if (!length) {
        return [];
    }
    if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
        start = 0;
        end = length;
    }
    return baseFill(array, value, start, end);
}
var array = [1, 2, 3];

_.fill(array, 'a');
console.log(array);
// => ['a', 'a', 'a']

_.fill(Array(3), 2);
// => [2, 2, 2]

_.fill([4, 6, 8, 10], '*', 1, 3);
// => [4, '*', '*', 10]