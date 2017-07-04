'use strict';

var representationMeteo = require("../representation/meteo");
var http = require("http");
var cheerio = require('cheerio');

exports.previsions = function (req, res) {
    function getMeteo(number, autresVilles) {
        var urlMeteo = 'http://www.meteociel.fr/previsions/' + number + '/ville.htm';
        http.get(urlMeteo, function (response) {
            var body = '';
            response.on('data', function (chunk) {
                body += chunk;
            });
            response.on('end', function () {
                res.send(200, representationMeteo.render(cheerio.load(body)), autresVilles);
            });
        }).on('error', function (e) {
            res.send(400, {erreur: e.message});
        });
    }

    function extraireLaVille(str){
        if (str !== null) {
            var arr = str.match(/<a href="\/previsions\/([0-9]{1,5})\/([_a-z]+)\.htm.+\(&#xA0;(\w+)&#xA0;\)/) || [""];
            return {id: arr[1], libelle: arr[2], region: arr[3]};
        }
        return {};
    }

    function extraireVilles(str) {
        var villes = [];
        if (str !== null) {
            var arr = str.match(/<li>.+?<\/li>/g) || [""];
            for(var i = 0; i < arr.length; i++) {
                villes.push(extraireLaVille(arr[i]));
            }
        }
        return villes;
    }

    function extraireIdentifiantVille(str) {
        if (str !== null) {
            var arr = str.match(/location\.href='\/previsions\/([0-9]{1,5})\/([_a-z]+)\.htm'/) || [""];
            return arr[1];
        }
        return {};
    }

    var ville = req.params.ville;
    if(/^[0-9]{1,5}$/.ville) {
        getMeteo(ville, null);
    } else {
        http.get("http://www.meteociel.fr/prevville.php?action=getville&ville=" + ville + "&envoyer=ici", function (response) {
            var body = '';
            response.on('data', function (chunk) {
                body += chunk;
            });
            response.on('end', function () {
                var dom = cheerio.load(body);
                var autresVilles = extraireVilles(dom("center center table tr").html());
                if(autresVilles.length === 0) {
                    getMeteo(extraireIdentifiantVille(body), null);
                } else {
                    getMeteo(autresVilles[0].id, autresVilles);
                }
            });
        }).on('error', function (e) {
            res.send(400, {erreur: e.message});
        });
    }
};