'use strict';

exports.qualiteAirVilles = function (ville, dom) {
    var indice = dom("#index-information .indice").html();

    return {
        ville: ville,
        indice: indice,
        indiceComplet: indice + '/100'
    };
};

exports.surfInfo = function (json) {
    var jsonSurfInfo = [];
    var semaine = json.PREVISIONS.SPOT[0].JOURS[0].JOUR;

    for (var i = 0; i < semaine.length; i++) {
        var jour = semaine[i];
        var horaires = jour['HORAIRE'];
        var tableauHoraire = {};

        for (var j = 0; j < horaires.length; j++) {
            var horaire = horaires[j];
            var conditionSurf = horaire.SURF[0];
            tableauHoraire[horaire['$'].heure + 'h'] = {
                tailleVagues: conditionSurf.TAILLE_VAGUES[0].PICTO[0]['$'].title,
                directionHoule: conditionSurf.DIRECTION_HOULE[0].PICTO[0]['$'].title,
                longueurHoule: {
                    periode: conditionSurf.LONGUEUR_HOULE[0].PERIODE,
                    longueur: conditionSurf.LONGUEUR_HOULE[0].LONGUEUR
                },
                directionVent: conditionSurf.DIRECTION_VENT[0].PICTO[0]['$'].title,
                vitesseVent: {
                    beaufort: conditionSurf.VITESSE_VENT[0].BEAUFORT,
                    noeud: conditionSurf.VITESSE_VENT[0].NOEUD
                },
                note: conditionSurf.NOTE[0].VALEUR[0],
                indiceConfiance: conditionSurf.INDICE_CONFIANCE[0].VALEUR[0]
            };
        }

        jsonSurfInfo.push({
            date: jour['$'].date,
            horaires: tableauHoraire
        });
    }
    return jsonSurfInfo;
};
