'use strict';

var restify = require('restify');
var js2xmlparser = require('js2xmlparser');
var server = restify.createServer({
    formatters: {
        'application/json; q=5': function format(req, res, body) {
            res.setHeader('Content-type', 'application/hal+json');
            return JSON.stringify(body);
        },
        'application/xml; q=0': function formatFoo(req, res, body) {
            return js2xmlparser('document', body);
        }
    }
});

server
    .use(restify.fullResponse())
    .use(restify.bodyParser())
;
server.pre(restify.pre.userAgentConnection());

require('./routes')(server);

server.listen(8002);