var zip = baseRest(unzip);
function unzip(array) {
    if (!(array && array.length)) {
        return [];
    }
    var length = 0;
    array = arrayFilter(array, function (group) {
        if (isArrayLikeObject(group)) {
            length = nativeMax(group.length, length);
            return true;
        }
    });
    return baseTimes(length, function (index) {
        return arrayMap(array, baseProperty(index));
    });
}
_.zip(['a', 'b'], [1, 2], [true, false]);
// => [['a', 1, true], ['b', 2, false]]