var cluster = require("cluster");
var start = Date.now();
var coreCount = require('os').cpus().length;
var clusterCount = 7;

module.exports = function () {
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
};