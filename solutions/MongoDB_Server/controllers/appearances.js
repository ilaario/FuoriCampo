const Appearances = require('../models/appearances/appearances');

function visualize() {
    return new Promise((resolve, reject) => {
        Appearances.find().limit(10)
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports.visualize = visualize;

function getPlayerByName(playerName) {
   return new Promise((resolve, reject) => {
       Appearances.aggregate([
           {
               $match: {
                   player_name: playerName
               }
           },
           {
               $lookup: {
                   from: "games",
                   localField: "game_id",
                   foreignField: "game_id",
                   as: "game_info"
               }
           },
           {
               $unwind: {
                   path: "$game_info",
                   preserveNullAndEmptyArrays: false
               }
           },
           {
               $group: {
                   _id: "$game_info.season",
                   totalMinutesPlayed: { $sum: "$minutes_played" },
                   totalGoals: { $sum: "$goals" },
                   totalAssists: { $sum: "$assists" },
                   totalRedCards: { $sum: "$red_cards" },
                   totalYellowCards: { $sum: "$yellow_cards" }
               }
           },
           {
               $sort: { _id: 1 },
           }
       ])
           .then(result => resolve(result))
           .catch(err => reject(err));
   })
}


function getPlayerStats(playerId) {
    return new Promise((resolve, reject) => {
        Appearances.aggregate([
            {
                $match: {
                    player_id: playerId
                }
            },
            {
                $lookup: {
                    from: "games", // Il nome della collezione 'games' come appare nel tuo database MongoDB
                    localField: "game_id",
                    foreignField: "game_id",
                    as: "game_info"
                }
            },
            {
                $unwind: {
                    path: "$game_info",
                    preserveNullAndEmptyArrays: false // Filtra via i documenti che non hanno un match in 'games'
                }
            },
            {
                $group: {
                    _id: "$game_info.season",
                    totalMinutesPlayed: { $sum: "$minutes_played" },
                    totalGoals: { $sum: "$goals" },
                    totalAssists: { $sum: "$assists" },
                    totalRedCards: { $sum: "$red_cards" },
                    totalYellowCards: { $sum: "$yellow_cards" }
                }
            },
            {
                $sort: { _id: 1 } // Ordina per season in modo ascendente
            }
        ])
            .then(results => resolve(results))
            .catch(error => reject(error));
    });
}

module.exports.getPlayerByName = getPlayerByName;
module.exports.getPlayerStats = getPlayerStats;

