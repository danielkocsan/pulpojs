var queue = require("./queueBuilder.js");
var deferred = require("deferred");
var startUp = 0 + process.env.startUp;

module.exports = function () {
    console.log('worker ' + process.pid + ' started up, took ' + (Date.now() - startUp) + ' ms');

    process.send('getIndex');

    process.on('message', function (index) {
        (function () {
            var def = deferred();
            console.log('worker retrieved index', index, process.pid);
            if (queue[index]) {
                queue[index](def);

                def.promise.then(function () {
                    console.info('test execution done', index, process.pid);
                    process.send('getIndex');    
                });
            } else {
                console.warn('worker ' + process.pid + ' exiting, ran ' + (Date.now() - startUp) + ' ms');
                process.exit();
            }
        }());
    });
};