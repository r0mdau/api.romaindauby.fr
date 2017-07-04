'use strict';

module.exports = function (server) {
    var qualiteAirController = require('../lib/controller/qualiteAir');
    var meteoController = require('../lib/controller/meteo');
    var surfController = require('../lib/controller/surf');

    var documentation = {};
    documentation['self'] = {href: '/'};
    documentation['meteo'] = {href: '/meteo/:ville'};
    documentation['qualite-air'] = {href: '/qualiteAir/:ville'};
    documentation['surf'] = {href: '/surf/conditions'};

    server.get('/', function (req, res) {
        res.send(200, {
            message: "Welcome to the API",
            _links: documentation
        });
    });

    server.get(documentation['qualite-air'].href, qualiteAirController.qualite);
    server.get(documentation['surf'].href, surfController.conditions);
    server.get(documentation['meteo'].href, meteoController.previsions);
};
