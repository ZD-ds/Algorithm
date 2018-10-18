function sample(collection) {
    var func = isArray(collection) ? arraySample : baseSample;
    return func(collection);
}
function arraySample(array) {
    var length = array.length;
    return length ? array[baseRandom(0, length - 1)] : undefined;
}
function baseSample(collection) {
    return arraySample(values(collection));
}
_.sample([1, 2, 3, 4]);
// => 2