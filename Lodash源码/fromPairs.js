
function fromPairs(arr) {
    var index = -1,
        length = arr == null ? 0 : arr.length,
        result = {};
    while (++index < length) {
        result[arr[index][0]] = arr[index][1];
    }
    return result;
}
_.fromPairs([['a', 1], ['b', 2]]);
// => { 'a': 1, 'b': 2 }