const Model = require('../models/club_games/club_game');

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
