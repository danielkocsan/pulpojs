var queue = [];

var context = {
    test: function (description, method) {
        queue.push(method);
    }
}

module.exports = (function () {
    var tests = require("./test.js");
    
    tests.call(context);
    
    return queue;
}());