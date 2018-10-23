var object = {
    'user': 'fred',
    'greet': function (greeting, punctuation) {
        return greeting + ' ' + this.user + punctuation;
    }
};

var bound = _.bindKey(object, 'greet', 'hi');
bound('!');
// => 'hi fred!'

object.greet = function (greeting, punctuation) {
    return greeting + 'ya ' + this.user + punctuation;
};

bound('!');
// => 'hiya fred!'

// Bound with placeholders.
var bound = _.bindKey(object, 'greet', _, '!');
bound('hi');
// => 'hiya fred!'
var bindKey = baseRest(function (object, key, partials) {
    var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
    if (partials.length) {
        var holders = replaceHolders(partials, getHolder(bindKey));
        bitmask |= WRAP_PARTIAL_FLAG;
    }
    return createWrap(key, bitmask, object, partials, holders);
});
