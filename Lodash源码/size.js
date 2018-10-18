function size(collection) {
    if (collection == null) {
        return 0;
    }
    if (isArrayLike(collection)) {
        return isString(collection) ? stringSize(collection) : collection.length;
    }
    var tag = getTag(collection);
    if (tag == mapTag || tag == setTag) {
        return collection.size;
    }
    return baseKeys(collection).length;
}
function getTag(value) {
    if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag && symToStringTag in Object(value))
        ? getRawTag(value)
        : objectToString(value);
}
function baseKeys(object) {
    if (!isPrototype(object)) {
        return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != 'constructor') {
            result.push(key);
        }
    }
    return result;
}
function overArg(func, transform) {
    return function (arg) {
        return func(transform(arg));
    };
}

_.size([1, 2, 3]);
// => 3

_.size({ 'a': 1, 'b': 2 });
// => 2

_.size('pebbles');
// => 7