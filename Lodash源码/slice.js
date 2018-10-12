function baseSlice(array, start, end) {
    var index = -1,
        length = array.length;

    if (start < 0) {
        start = -start > length ? 0 : (length + start);
    }
    end = end > length ? length : end;
    if (end < 0) {
        end += length;
    }
    length = start > end ? 0 : ((end - start) >>> 0);
    start >>>= 0;

    var result = Array(length);
    while (++index < length) {
        result[index] = array[index + start];
    }
    return result;
}
function slice(array, start, end) {
    var length = array == null ? 0 : array.length;
    if (!length) {
        return [];
    }
    if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
        start = 0;
        end = length;
    }
    else {
        start = start == null ? 0 : toInteger(start);
        end = end === undefined ? length : toInteger(end);
    }
    return baseSlice(array, start, end);
}
_.slice(array, [start = 0], [end = array.length])