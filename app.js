var cluster = require("cluster");

if (cluster.isMaster) {
    (function () {
        var start = Date.now();

        var coreCount = require('os').cpus().length;
        var clusterCount = 4;
        
        console.log('Master process: cpu cores count ' + coreCount + '; exetuing with ' + clusterCount + ' workers');

        process.on("exit", function() {
          var end = Date.now();
          console.log("Time taken: %ds", (end - start)/1000);
        });
        
        var index = 0;
        
        for (var i = 0; i < clusterCount; i++) {
            (function () {
                var worker = cluster.fork({startUp: Date.now()});
                
                worker.on('message', function (message) {
                    worker.send(index);
                    index++;
                });        
            }());
        }
        
        
    }());
} else {
    (function () {
        var queue = require("./queue.js");
        var deferred = require("deferred");
        var now = new Date();
        var startUp = 0 + process.env.startUp;
        
        console.log(startUp);
        
        console.log('worker ' + process.pid + ' started up, took ' + (now - startUp) + ' ms');
        
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
                    var now = Date.now();
                    console.warn('worker ' + process.pid + ' exiting, ran ' + (now - startUp) + ' ms');
                    process.exit();
                }
            }());
        });
    }());
}