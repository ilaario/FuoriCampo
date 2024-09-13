const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Games = new Schema(
    {
        game_id: { type: Number },
        competition_id: { type: String },
        season: { type: Number },
        round: { type: String },
        date: { type: Date },
        home_club_id: { type: Number },
        away_club_id: { type: Number },
        home_club_goals: { type: Number },
        away_club_goals: { type: Number },
        home_club_position: { type: Number },
        away_club_position: { type: Number },
        home_club_manager_name: { type: String },
        away_club_manager_name: { type: String },
        stadium: { type: String },
        attendance: { type: Number },
        referee: { type: String },
        url: { type: String },
        home_club_formation: { type: String },
        away_club_formation: { type: String },
        home_club_name: { type: String },
        away_club_name: { type: String },
        aggregate: { type: String },
        competition_type: { type: String }
    });

const games = mongoose.model('Games', Games, 'games');

module.exports = games;
