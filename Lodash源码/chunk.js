
function toFinite(value) {
    if (!value) {
        return value === 0 ? value : 0;
    }
    value = toNumber(value);
    if (value === INFINITY || value === -INFINITY) {
        var sign = (value < 0 ? -1 : 1);
        return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
}
function toInteger(value) {
    var result = toFinite(value),
        remainder = result % 1;

    return result === result ? (remainder ? result - remainder : result) : 0;
}
//为什么要向右移动0位
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
function chunk(arr, size) {
    //进行判断
    if (size === undefined) {
        size = 1;
    } else {
        size = Math.max(toInteger(size), 0);
    }
    var length = array == null ? 0 : arr.length;
    var length = array == null ? 0 : array.length;
    if (!length || size < 1) {
        return [];
    }
    var index = 0,
        resIndex = 0,
        result = Array(Max.ceil(length / size));
    while (index < length) {
        result[resIndex++] = baseSlice(array, index, (index += size));
    }
    return result;
}

