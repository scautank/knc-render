'use strict';

const cluster = require('cluster');
const os = require('os');
const app = require('./index');
let numCPUs = os.cpus().length;

if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', function(worker) {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    app.startServer();
}
