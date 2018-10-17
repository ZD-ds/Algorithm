_.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
// => [[1, 5, 7], [1, 2, 3]]

_.invokeMap([123, 456], String.prototype.split, '');
// => [['1', '2', '3'], ['4', '5', '6']]
var invokeMap = baseRest(function (collection, path, args) {
    var index = -1,
        isFunc = typeof path == 'function',
        result = isArrayLike(collection) ? Array(collection.length) : [];
    baseEach(collection, function (value) {
        result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
    });
    return result;
});
function baseInvoke(object, path, args) {
    path = castPath(path, object);
    object = parent(object, path);
    var func = object == null ? object : object[toKey(last(path))];
    return func == null ? undefined : apply(func, object, args);
}

