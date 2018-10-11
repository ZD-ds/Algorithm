function basePullAt(array, indexes) {
    var length = array ? indexes.length : 0,
        lastIndex = length - 1;

    while (length--) {
        var index = indexes[length];
        if (length == lastIndex || index !== previous) {
            var previous = index;
            if (isIndex(index)) {
                splice.call(array, index, 1);
            } else {
                //对于类数组对象的处理
                baseUnset(array, index);
            }
        }
    }
    return array;
}

function remove(array, predicate) {
    var result = [];
    if (!(array && array.length)) {
        return result;
    }
    var index = -1,
        indexes = [],
        length = array.length;

    predicate = getIteratee(predicate, 3);
    while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
            result.push(value);
            indexes.push(index);
        }
    }
    basePullAt(array, indexes);
    return result;
}

var array = [1, 2, 3, 4];
var evens = _.remove(array, function (n) {
    return n % 2 == 0;
});

console.log(array);
// => [1, 3]

console.log(evens);
// => [2, 4]