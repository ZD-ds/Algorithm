/**
    * Checks if `value` is a valid array-like index.
    *
    * @private
    * @param {*} value The value to check.
    * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
    * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
    */
function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;

    return !!length &&
        (type == 'number' ||
            (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}
/**
   * The base implementation of `_.nth` which doesn't coerce arguments.
   *
   * @private
   * @param {Array} array The array to query.
   * @param {number} n The index of the element to return.
   * @returns {*} Returns the nth element of `array`.
   */
function baseNth(array, n) {
    var length = array.length;
    if (!length) {
        return;
    }
    n += n < 0 ? length : 0;
    return isIndex(n, length) ? array[n] : undefined;
}
function nth(array, n) {
    return (array && array.length) ? baseNth(array, toInteger(n)) : undefined;
}
var array = ['a', 'b', 'c', 'd'];

_.nth(array, 1);
// => 'b'

_.nth(array, -2);
// => 'c';