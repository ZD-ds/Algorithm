function memoize(func, resolver) {
    if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function () {
        var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;

        if (cache.has(key)) {
            return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
    };
    memoized.cache = new (memoize.Cache || MapCache);
    return memoized;
}
function memoizeCapped(func) {
    var result = memoize(func, function (key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
            cache.clear();
        }
        return key;
    });

    var cache = result.cache;
    return result;
}
var stringToPath = memoizeCapped(function (string) {
    var result = [];
    if (string.charCodeAt(0) === 46 /* . */) {
        result.push('');
    }
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    string.replace(rePropName, function (match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
    });
    return result;
});

/**
    * Casts `value` to a path array if it's not one.
    *
    * @private
    * @param {*} value The value to inspect.
    * @param {Object} [object] The object to query keys on.
    * @returns {Array} Returns the cast property path array.
    */
function castPath(value, object) {
    if (isArray(value)) {
        return value;
    }
    return isKey(value, object) ? [value] : stringToPath(toString(value));
}
/**
    * The base implementation of `_.set`.
    *
    * @private
    * @param {Object} object The object to modify.
    * @param {Array|string} path The path of the property to set.
    * @param {*} value The value to set.
    * @param {Function} [customizer] The function to customize path creation.
    * @returns {Object} Returns `object`.
    */
function baseSet(object, path, value, customizer) {
    if (!isObject(object)) {
        return object;
    }
    path = castPath(path, object);

    var index = -1,
        length = path.length,
        lastIndex = length - 1,
        nested = object;

    while (nested != null && ++index < length) {
        var key = toKey(path[index]),
            newValue = value;

        if (index != lastIndex) {
            var objValue = nested[key];
            newValue = customizer ? customizer(objValue, key, nested) : undefined;
            if (newValue === undefined) {
                newValue = isObject(objValue)
                    ? objValue
                    : (isIndex(path[index + 1]) ? [] : {});
            }
        }
        assignValue(nested, key, newValue);
        nested = nested[key];
    }
    return object;
}

function zipObjectDeep(props, values) {
    return baseZipObject(props || [], values || [], baseSet);
}
function baseZipObject(props, values, assignFunc) {
    var index = -1,
        length = props.length,
        valsLength = values.length,
        result = {};

    while (++index < length) {
        var value = index < valsLength ? values[index] : undefined;
        assignFunc(result, props[index], value);
    }
    return result;
}

_.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
// => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }