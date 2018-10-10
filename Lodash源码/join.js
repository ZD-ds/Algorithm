function join(array, separator) {
    return array == null ? '' : Array.prototype.join.call(array, separator);
}
_.join(['a', 'b', 'c'], '~');
// => 'a~b~c'