const Model = require("../models/gameevents/gameevents");
const axios = require('axios');

function visualize() {
    return new Promise((resolve, reject) => {
        Model.find().limit(10)
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports.visualize = visualize;

function getGameEventsByGameId(game_id) {
    return new Promise((resolve, reject) => {
        Model.find({ game_id: game_id }).sort({ minute: 1 })
            .then(gameevents => {
                // Creare un array di promesse
                const promises = gameevents.map(async gameevent => {
                    // Convertire il documento Mongoose in un semplice oggetto JavaScript
                    gameevent = gameevent.toObject();

                    gameevent.nome_player_id = gameevent.player_id ? (await axios.get(`http://localhost:8080/players/getPlayerById?player_id=${gameevent.player_id}`)).data : null;
                    gameevent.nome_player_in_id = gameevent.player_in_id ? (await axios.get(`http://localhost:8080/players/getPlayerById?player_id=${gameevent.player_in_id}`)).data : null;
                    gameevent.nome_player_assist_id = gameevent.player_assist_id ? (await axios.get(`http://localhost:8080/players/getPlayerById?player_id=${gameevent.player_assist_id}`)).data : null;
                    console.log(gameevent);
                    return gameevent;
                });

                // Attendere che tutte le promesse siano risolte
                Promise.all(promises)
                    .then(updatedGameEvents => resolve(updatedGameEvents))
                    .catch(error => reject(error));
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports.getGameEventsByGameId = getGameEventsByGameId;
