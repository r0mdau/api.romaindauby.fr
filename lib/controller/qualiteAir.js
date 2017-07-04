'use strict';

var representationQualiteAirVille = require('../representation/qualiteAirVille');
var http = require('http');

exports.qualite = function (req, res) {
    var villeMap = {
        angouleme: 16015,
        bayonne: 64102,
        bordeaux: 33063,
        "brive-la-gaillarde": 19031,
        larochelle: 17300,
        limoges: 87085,
        niort: 79191,
        pau: 64445,
        perigueux: 24322,
        poitiers: 86194
    };

    if (!villeMap.hasOwnProperty(req.params.ville)) {
        res.send(400, {villes: villeMap});
    }
    var urlQualiteAirVilles = 'http://www.atmo-nouvelleaquitaine.org/widget/monair/commune/' + villeMap[req.params.ville];
    http.get(urlQualiteAirVilles, function (response) {
        var body = '';
        response.on('data', function (chunk) {
            body += chunk;
        });
        response.on('end', function () {
            res.send(200, representationQualiteAirVille.render(req.params.ville, body));
        });
    }).on('error', function (e) {
        res.send(400, {erreur: e.message});
    });
};
