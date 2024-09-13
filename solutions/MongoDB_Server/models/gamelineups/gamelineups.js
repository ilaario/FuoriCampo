const mongoose = require('mongoose');

const gamelineups = new mongoose.Schema({
    game_lineups_id: String,
    game_id: Number,
    club_id: Number,
    type: String,
    number: Number,
    player_id: Number,
    player_name: String,
    team_captain: Number,
    position: String
});

module.exports = mongoose.model('GameLineUps', gamelineups, 'gamelineups');
