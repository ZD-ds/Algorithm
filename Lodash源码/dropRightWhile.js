/**
    * The base implementation of `_.isMatch` without support for iteratee shorthands.
    *
    * @private
    * @param {Object} object The object to inspect.
    * @param {Object} source The object of property values to match.
    * @param {Array} matchData The property names, values, and compare flags to match.
    * @param {Function} [customizer] The function to customize comparisons.
    * @returns {boolean} Returns `true` if `object` is a match, else `false`.
    */
function baseIsMatch(object, source, matchData, customizer) {
    var index = matchData.length,
        length = index,
        noCustomizer = !customizer;

    if (object == null) {
        return !length;
    }
    object = Object(object);
    while (index--) {
        var data = matchData[index];
        if ((noCustomizer && data[2])
            ? data[1] !== object[data[0]]
            : !(data[0] in object)
        ) {
            return false;
        }
    }
    while (++index < length) {
        data = matchData[index];
        var key = data[0],
            objValue = object[key],
            srcValue = data[1];

        if (noCustomizer && data[2]) {
            if (objValue === undefined && !(key in object)) {
                return false;
            }
        } else {
            var stack = new Stack;
            if (customizer) {
                var result = customizer(objValue, srcValue, key, object, source, stack);
            }
            if (!(result === undefined
                ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
                : result
            )) {
                return false;
            }
        }
    }
    return true;
}
/**
     * Gets the property names, values, and compare flags of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the match data of `object`.
     */
function isStrictComparable(value) {
    return value === value && !isObject(value);
}

function getMatchData(object) {
    var result = keys(object),
        length = result.length;

    while (length--) {
        var key = result[length],
            value = object[key];

        result[length] = [key, value, isStrictComparable(value)];
    }
    return result;
}
function property(path) {
    return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}
/**
     * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
     *
     * @private
     * @param {string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
function baseMatchesProperty(path, srcValue) {
    if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
    }
    return function (object) {
        var objValue = get(object, path);
        return (objValue === undefined && objValue === srcValue)
            ? hasIn(object, path)
            : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
    };
}
/**
    * The base implementation of `_.matches` which doesn't clone `source`.
    *
    * @private
    * @param {Object} source The object of property values to match.
    * @returns {Function} Returns the new spec function.
    */
function baseMatches(source) {
    var matchData = getMatchData(source);
    if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
    }
    return function (object) {
        return object === source || baseIsMatch(object, source, matchData);
    };
}
/**
  * The base implementation of `_.iteratee`.
  *
  * @private
  * @param {*} [value=_.identity] The value to convert to an iteratee.
  * @returns {Function} Returns the iteratee.
  */
function baseIteratee(value) {
    // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
    // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
    if (typeof value == 'function') {
        return value;
    }
    if (value == null) {
        return identity;
    }
    if (typeof value == 'object') {
        return isArray(value)
            ? baseMatchesProperty(value[0], value[1])
            : baseMatches(value);
    }
    return property(value);
}
function getIteratee() {
    var result = lodash.iteratee || iteratee;
    result = result === iteratee ? baseIteratee : result;
    return arguments.length ? result(arguments[0], arguments[1]) : result;
}
/**
   * The base implementation of methods like `_.dropWhile` and `_.takeWhile`
   * without support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to query.
   * @param {Function} predicate The function invoked per iteration.
   * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Array} Returns the slice of `array`.
   */
function baseWhile(array, predicate, isDrop, fromRight) {
    var length = array.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length) &&
        predicate(array[index], index, array)) { }

    return isDrop
        ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
        : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
}
function dropRightWhile(array, predicate) {
    return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), true, true)
        : [];
}

//这个函数主要市getIteratee返回的函数问题
//1 如果是函数直接返回函数
//2 如果是对象 会返回这个函数 
//function (object) {
//  return object === source || baseIsMatch(object, source, matchData);
//};
//这个函数会判断对象是否相等，并且从属性值是否相等进行分析
//如果predicate(array[index], index, array)) 为false则开始drop为true则继续循环
//3 如果参数是一个数组
//执行baseMatchesProperty(value[0], value[1])
//返回这个函数
/** return function (object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue &&
          (srcValue !== undefined || (key in Object(object)));
      };
*/
//说明传数组为两个参数，一个为属性值，一个为值，当object有有属性等于属性值等于数组第二个值时候返回true

//4 如果参数为字符串
/**
 * return function (object) {
      return object == null ? undefined : object[key];
    };
 */
//明显会返回对象的key


