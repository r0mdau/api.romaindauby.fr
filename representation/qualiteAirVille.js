'use strict';

exports.render = function (ville, dom) {
    var indice = dom("#index-information .indice").html();

    return {
        ville: ville,
        indice: indice,
        indiceComplet: indice + '/100'
    };
};
