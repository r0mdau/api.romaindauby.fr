'use strict';

var restify = require('restify');
var js2xmlparser = require('js2xmlparser');
var server = restify.createServer();

server
    .use(restify.fullResponse())
    .use(restify.bodyParser())
;
server.pre(restify.pre.userAgentConnection());

require('./lib/routes')(server);

server.listen(8002);
