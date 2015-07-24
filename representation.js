'use strict';

exports.qualiteAirVilles = function (json) {
    var villes = [
        'Bordeaux', 'Pau', 'Bayonne', 'Lacq', 'Périgueux',
        'Agen', 'Dax', 'Arcachon'
    ];

    var jsonVilles = {};
    for (var ID in json) {
        if (json.hasOwnProperty(ID)) {
            jsonVilles[villes[ID - 1]] = json[ID];
        }
    }
    return jsonVilles;
};

exports.surfInfo = function (json) {
    var jsonSurfInfo = [];
    var semaine = json.PREVISIONS.SPOT[0].JOURS[0].JOUR;

    for(var i = 0; i < semaine.length; i++){
        var jour = semaine[i];
        var horaires = jour['HORAIRE'];
        var tableauHoraire = {};

        for(var j = 0; j < horaires.length; j++){
            var horaire = horaires[j];
            var conditionSurf = horaire.SURF[0];
            tableauHoraire[horaire['$'].heure + 'h'] = {
                tailleVagues: conditionSurf.TAILLE_VAGUES[0].PICTO[0]['$'].title,
                directionHoule: conditionSurf.DIRECTION_HOULE[0].PICTO[0]['$'].title,
                longueurHoule: {
                    periode:conditionSurf.LONGUEUR_HOULE[0].PERIODE,
                    longueur:conditionSurf.LONGUEUR_HOULE[0].LONGUEUR
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
