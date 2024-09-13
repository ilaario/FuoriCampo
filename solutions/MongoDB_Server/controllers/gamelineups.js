const Model = require("../models/gamelineups/gamelineups");

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


/**
 * Retrieves the lineups for a specific game and club, including both starting lineup and substitutes.
 * The results are sorted by position based on a predefined order.
 *
 * @param {string} game_id - The ID of the game.
 * @param {string} club_id - The ID of the club.
 * @returns {Promise<Array>} - A promise that resolves to an array of player lineups sorted by position.
 */
function getLineupsByGameAndClub(game_id, club_id) {
    return new Promise((resolve, reject) => {
        // New order for positions
        const positionOrder = ['Goalkeeper', 'Left-Back', 'Centre-Back', 'Right-Back', 'Defensive Midfield', 'Left Winger', 'Left Midfield', 'Central Midfield', 'Right Midfield', 'Right Winger', 'Attacking Midfield', 'Centre-Forward', 'Second Striker', 'Attack'];

        // Query for starting lineup players
        Model.find({ game_id: game_id, club_id: club_id, type: 'starting_lineup' })
            .then(startingLineup => {
                // Sort results based on 'position' field
                startingLineup.sort((a, b) => {
                    return positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position);
                });

                // Query for substitute players
                Model.find({ game_id: game_id, club_id: club_id, type: 'substitutes' })
                    .then(substitutes => {
                        // Sort results based on 'position' field
                        substitutes.sort((a, b) => {
                            return positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position);
                        });

                        // Merge the two arrays
                        const lineups = startingLineup.concat(substitutes);

                        resolve(lineups);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports.getLineupsByGameAndClub = getLineupsByGameAndClub;
