'use strict';

var representationSurf = require('../representation/surf');
var http = require('http');
var crypto = require('../crypto');
var parseString = require('xml2js').parseString;

exports.conditions = function (req, res) {
    var urlSurfInfo = 'fc7a8af6859a36a6ed0d9b5f95023d09915d2e5e5dd7670330bf7f63bdd023e1606c2a2adfc363cc50640aca' +
        '39d1d65c328257798bb0a7b9c2ce687a3c9e1de5583cf8751b764ec24f4787a27273154aa24ff05fdf02fb786792c8e4af171aa3' +
        '802ed822d91d5ad0f6027213e3c0009e501702a5a32887de048a40e086758872b56dee7987cbd67a34f3fce350d424c094f31a24' +
        'eb3e501832d99f752251bd9c6cf2c809150fc4fdf48f8f9d8b34ae06659233612c980c2e9a3d1a1666b1b3e9cdd1e693f18bd98' +
        '427cd97b52c46353619ce70f7eb4b663eb57492be9de26eefa041c966';

    http.get(crypto.decrypt(urlSurfInfo), function (response) {
        var body = '';
        response.on('data', function (chunk) {
            body += chunk;
        });
        response.on('end', function () {
            parseString(body, function (err, result) {
                res.send(200, representationSurf.render(result));
            });
        });
    }).on('error', function (e) {
        res.send(400, {erreur: e.message});
    });
};
