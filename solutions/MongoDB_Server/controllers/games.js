const Model = require('../models/games/games');

function getGameById(game_id) {
    return new Promise((resolve, reject) => {
        Model.findOne({ game_id: game_id })
            .then(game => {
                resolve(game);
            })
            .catch(error => {
                reject(error);
            });
    });
}
module.exports.getGameById = getGameById;

function getMatches(season, competition_type, competition_id, date) {
    return new Promise((resolve, reject) => {
        // Creazione dell'oggetto query
        let query = {};
        console.log(season || 'NULL', competition_type || 'NULL', competition_id || 'NULL', date || 'NULL');

        // Aggiunta dei parametri alla query solo se non sono null
        if (season !== '') query.season = season;
        if (competition_type !== '') query.competition_type = competition_type;
        if (competition_id !== '') query.competition_id = competition_id;
        if (date !== null && !isNaN(Date.parse(date))) query.date = new Date(date);
        console.log("Query:" + query.season +'||', query.competition_type+'||', query.competition_id+'||', query.date+'||');

        Model.find(query, {
            game_id: 1, // Aggiunto game_id
            home_club_name: 1,
            home_club_goals: 1,
            away_club_goals: 1,
            away_club_name: 1,
            home_club_id: 1, // Added home_club_id
            away_club_id: 1  // Added away_club_id
        }).limit(252)
            .then(matches => {
                // Gestione dei campi NULL
                matches = matches.map(match => {
                    return {
                        game_id: match.game_id, // Aggiunto game_id
                        home_club_name: match.home_club_name || null,
                        home_club_goals: match.home_club_goals || null,
                        away_club_goals: match.away_club_goals || null,
                        away_club_name: match.away_club_name || null,
                        home_club_id: match.home_club_id || null, // Added home_club_id
                        away_club_id: match.away_club_id || null  // Added away_club_id
                    };
                });
                resolve(matches);
            })
            .catch(error => {
                reject(error);
            });
    });
}
module.exports.getMatches = getMatches;

function getGamesITByDate() {
    return new Promise((resolve, reject) => {
        Model.find({competition_id: 'IT1'}, {game_id: 1, date: 1, season: 1, home_club_name: 1, away_club_name: 1, competition_type: 1, home_club_id: 1, away_club_id: 1, home_club_goals: 1, away_club_goals: 1})
            .sort({date: -1})
            .limit(10)
            .then(results => {
                // Gestione dei campi NULL
                results = results.map(result => {
                    return {
                        game_id: result.game_id !== undefined ? result.game_id : null,
                        date: result.date !== undefined ? result.date : null,
                        season: result.season !== undefined ? result.season : null,
                        home_club_name: result.home_club_name !== undefined ? result.home_club_name : null,
                        away_club_name: result.away_club_name !== undefined ? result.away_club_name : null,
                        competition_type: result.competition_type !== undefined ? result.competition_type : null,
                        home_club_id: result.home_club_id !== undefined ? result.home_club_id : null,
                        away_club_id: result.away_club_id !== undefined ? result.away_club_id : null,
                        home_club_goals: result.home_club_goals !== undefined ? result.home_club_goals : null,
                        away_club_goals: result.away_club_goals !== undefined ? result.away_club_goals : null
                    };
                });
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports.getGamesITByDate = getGamesITByDate;

function getGamesByDate() {
    return new Promise((resolve, reject) => {
        Model.find({competition_id: 1}, {game_id: 1, date: 1, season: 1, home_club_name: 1, away_club_name: 1, competition_type: 1, home_club_id: 1, away_club_id: 1, home_club_goals: 1, away_club_goals: 1})
            .sort({date: -1})
            .limit(10)
            .then(results => {
                // Gestione dei campi NULL
                results = results.map(result => {
                    return {
                        competition_id: result.competition_id !== undefined ? result.competition_id : null,
                        game_id: result.game_id !== undefined ? result.game_id : null,
                        date: result.date !== undefined ? result.date : null,
                        season: result.season !== undefined ? result.season : null,
                        home_club_name: result.home_club_name !== undefined ? result.home_club_name : null,
                        away_club_name: result.away_club_name !== undefined ? result.away_club_name : null,
                        competition_type: result.competition_type !== undefined ? result.competition_type : null,
                        home_club_id: result.home_club_id !== undefined ? result.home_club_id : null,
                        away_club_id: result.away_club_id !== undefined ? result.away_club_id : null,
                        home_club_goals: result.home_club_goals !== undefined ? result.home_club_goals : null,
                        away_club_goals: result.away_club_goals !== undefined ? result.away_club_goals : null
                    };
                });
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports.getGamesByDate = getGamesByDate;

function getTeamStats(competition_id, season) {
    return new Promise((resolve, reject) => {
        const numericSeason = parseInt(season, 10);
        Model.aggregate([
            {
                $match: {
                    competition_id: competition_id,
                    season: numericSeason
                }
            },
            {
                $facet: {
                    "home": [
                        {
                            $group: {
                                _id: "$home_club_id",
                                goalsFor: { $sum: "$home_club_goals" },
                                goalsAgainst: { $sum: "$away_club_goals" },
                                wins: {
                                    $sum: {
                                        $cond: [{ $gt: ["$home_club_goals", "$away_club_goals"] }, 1, 0]
                                    }
                                },
                                draws: {
                                    $sum: {
                                        $cond: [{ $eq: ["$home_club_goals", "$away_club_goals"] }, 1, 0]
                                    }
                                },
                                matches: { $sum: 1 } // Conta tutte le partite giocate in casa
                            }
                        }
                    ],
                    "away": [
                        {
                            $group: {
                                _id: "$away_club_id",
                                goalsFor: { $sum: "$away_club_goals" },
                                goalsAgainst: { $sum: "$home_club_goals" },
                                wins: {
                                    $sum: {
                                        $cond: [{ $gt: ["$away_club_goals", "$home_club_goals"] }, 1, 0]
                                    }
                                },
                                draws: {
                                    $sum: {
                                        $cond: [{ $eq: ["$away_club_goals", "$home_club_goals"] }, 1, 0]
                                    }
                                },
                                matches: { $sum: 1 } // Conta tutte le partite giocate fuori casa
                            }
                        }
                    ]
                }
            },
            {
                $project: {
                    teams: { $setUnion: ["$home", "$away"] }
                }
            },
            { $unwind: "$teams" },
            { $replaceRoot: { newRoot: "$teams" } },
            {
                $group: {
                    _id: "$_id",
                    totalGoalsFor: { $sum: "$goalsFor" },
                    totalGoalsAgainst: { $sum: "$goalsAgainst" },
                    totalWins: { $sum: "$wins" },
                    totalDraws: { $sum: "$draws" },
                    totalMatches: { $sum: "$matches" } // Somma totale delle partite giocate
                }
            },
            {
                $addFields: {
                    totalLosses: { $subtract: ["$totalMatches", { $add: ["$totalWins", "$totalDraws"] }] }, // Calcola le sconfitte
                    totalPoints: { $add: [{ $multiply: ["$totalWins", 3] }, "$totalDraws"] }, // Mantiene il calcolo dei punti totali
                    goalDifference: { $subtract: ["$totalGoalsFor", "$totalGoalsAgainst"] } // Calcola la differenza reti
                }
            },
            { $sort: { totalPoints: -1, goalDifference: -1, totalGoalsFor: -1 } } // Ordina per punti totali, poi differenza reti, poi gol fatti
        ])
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports.getTeamStats = getTeamStats;

function getMatchesByCompetitionAndSeason(competition_id, season) {
    return new Promise((resolve, reject) => {
        Model.aggregate([
            {
                $match: {
                    competition_id: competition_id,
                    season: season // Non convertire season in un numero se è memorizzato come stringa nel database
                }
            },
            {
                $addFields: {
                    roundNumber: {
                        $cond: {
                            if: { $eq: [ "$competition_type", "domestic_league" ] },
                            then: {
                                $toInt: {
                                    $arrayElemAt: [
                                        {
                                            $split: ["$round", "."]
                                        },
                                        0
                                    ]
                                }
                            },
                            else: "$round"
                        }
                    }
                }
            },
            {
                $group: {
                    _id: "$roundNumber",
                    matches: { $push: "$$ROOT" }
                }
            },
            {
                $sort: {
                    _id: -1
                }
            }
        ])
            .then(matches => {
                resolve(matches);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports.getMatchesByCompetitionAndSeason = getMatchesByCompetitionAndSeason;

