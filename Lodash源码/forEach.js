function forEach(collection, iteratee) {
    var func = isArray(collection) ? arrayEach : baseEach;
    return func(collection, getIteratee(iteratee, 3));
}
function createBaseEach(eachFunc, fromRight) {
    return function (collection, iteratee) {
        if (collection == null) {
            return collection;
        }
        if (!isArrayLike(collection)) {
            return eachFunc(collection, iteratee);
        }
        var length = collection.length,
            index = fromRight ? length : -1,
            iterable = Object(collection);

        while ((fromRight ? index-- : ++index < length)) {
            if (iteratee(iterable[index], index, iterable) === false) {
                break;
            }
        }
        return collection;
    };
}
var baseFor = createBaseFor();
function createBaseFor(fromRight) {
    return function (object, iteratee, keysFunc) {
        var index = -1,
            iterable = Object(object),
            props = keysFunc(object),
            length = props.length;

        while (length--) {
            var key = props[fromRight ? length : ++index];
            if (iteratee(iterable[key], key, iterable) === false) {
                break;
            }
        }
        return object;
    };
}
function baseForOwn(object, iteratee) {
    return object && baseFor(object, iteratee, keys);
}

var baseEach = createBaseEach(baseForOwn);
function arrayEach(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
            break;
        }
    }
    return array;
}
_.forEach([1, 2], function (value) {
    console.log(value);
});
// => Logs `1` then `2`.

_.forEach({ 'a': 1, 'b': 2 }, function (value, key) {
    console.log(key);
});
  // => Logs 'a' then 'b' (iteration order is not guaranteed).