'use strict';

var cheerio = require('cheerio');

exports.render = function (ville, body) {
    var dom = cheerio.load(body);
    var indice = dom("#index-information .indice").html();

    return {
        ville: ville,
        indice: indice,
        indiceComplet: indice + '/100'
    };
};
