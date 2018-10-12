nativeReverse = Array.prototype.reverse;
function reverse(array) {
    return array == null ? array : nativeReverse.call(array);
}
var array = [1, 2, 3];

_.reverse(array);
// => [3, 2, 1]

console.log(array);
// => [3, 2, 1]