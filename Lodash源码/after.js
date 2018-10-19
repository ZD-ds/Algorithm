var saves = ['profile', 'settings'];

var done = _.after(saves.length, function () {
    console.log('done saving!');
});

_.forEach(saves, function (type) {
    asyncSave({ 'type': type, 'complete': done });
});
// => Logs 'done saving!' after the two async saves have completed.
function after(n, func) {
    if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    n = toInteger(n);
    return function () {
        if (--n < 1) {
            return func.apply(this, arguments);
        }
    };
}
//要执行done多少次才能执行这个函数