'use strict';

exports.render = function (dom) {
    function extraireTemperature(str) {
        if (str !== null) {
            var arr = str.match(/^([0-9]{1,2})/g) || [""];
            return arr[0];
        }
        return "";
    }

    function extraireVentDirection(str) {
        if (str !== null) {
            var arr = str.match(/(title=\"(.+) : )/) || [""];
            return arr[2].toLowerCase();
        }
        return "";
    }

    function extraireVentDirectionPicto(str) {
        if (str !== null) {
            var arr = str.match(/(src=\"(.+)" alt=)/) || [""];
            return arr[2];
        }
        return "";
    }

    function extrairePicto(str) {
        if (str !== null) {
            var arr = str.match(/(src=\"(.+)">)/) || [""];
            return arr[2];
        }
        return "";
    }

    var jsonMeteo = [];
    var i = 0;
    dom("center table table tr").each(function (index, value) {
        var premiereLigne = dom(value.children[0]).html();
        var indice = 0;
        if (!(/^[0-9]{2}:[0-9]{2}$/.test(premiereLigne))) {
            indice++
        }
        var heure = dom(value.children[indice++]).html();
        if(/^[0-9]{2}:[0-9]{2}$/.test(heure)) {
            jsonMeteo.push({
                heure: heure,
                temperature: extraireTemperature(dom(value.children[indice++]).html()),
                vent: {
                    direction: extraireVentDirection(dom(value.children[indice]).html()),
                    directionPicto: extraireVentDirectionPicto(dom(value.children[indice++]).html()),
                    vitesse: dom(value.children[indice++]).html() + " km/h",
                    rafale: dom(value.children[indice++]).html() + " km/h"
                },
                pluie: dom(value.children[indice++]).html(),
                humidite: dom(value.children[indice++]).html(),
                pression: dom(value.children[indice++]).html(),
                picto: extrairePicto(dom(value.children[indice]).html())
            });
        }
    });
    return jsonMeteo;
};