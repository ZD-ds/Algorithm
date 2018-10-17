function baseRest(func, start) {
    return setToString(overRest(func, start, identity), func + '');
}
var setToString = shortOut(baseSetToString);
var baseSetToString = !defineProperty ? identity : function (func, string) {
    return defineProperty(func, 'toString', {
        'configurable': true,
        'enumerable': false,
        'value': constant(string),
        'writable': true
    });
};
function shortOut(func) {
    var count = 0,
        lastCalled = 0;

    return function () {
        var stamp = nativeNow(),
            remaining = HOT_SPAN - (stamp - lastCalled);

        lastCalled = stamp;
        if (remaining > 0) {
            if (++count >= HOT_COUNT) {
                return arguments[0];
            }
        } else {
            count = 0;
        }
        return func.apply(undefined, arguments);
    };
}
function overRest(func, start, transform) {
    start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
    return function () {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            array = Array(length);

        while (++index < length) {
            array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
            otherArgs[index] = args[index];
        }
        otherArgs[start] = transform(array);
        return apply(func, this, otherArgs);
    };
}