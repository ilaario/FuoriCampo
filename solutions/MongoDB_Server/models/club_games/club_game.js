const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClubGames = new Schema(
    {
        game_id: { type: Number },
        club_id: { type: Number },
        own_goals: { type: Number },
        own_position: { type: Number },
        own_manager_name: { type: String },
        opponent_id: { type: Number },
        opponent_goals: { type: Number },
        opponent_position: { type: Number },
        opponent_manager_name: { type: String },
        hosting: { type: String },
        is_win: { type: Number },
    });

const club_games = mongoose.model('ClubGames', ClubGames, 'club_games');

module.exports = club_games;
