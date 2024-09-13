/*const mongoose = require('mongoose');

const appearanceSchema = new mongoose.Schema(
    {
        appearance_id: { type: String },
        game_id: { type: Number },
        player_id: { type: Number },
        player_club_id: { type: Number },
        player_current_club_id: { type: Number },
        date: { type: Date },
        player_name: { type: String },
        competition_id: { type: String },
        yellow_cards: { type: Number },
        red_cards: { type: Number },
        goals: { type: Number },
        assists: { type: Number },
        minutes_played: { type: Number }
    });

const appearances = mongoose.model('Appearances', appearanceSchema, 'appearances');

module.exports = appearances; */
const mongoose = require('mongoose');

const appearanceSchema = new mongoose.Schema({
        appearance_id: { type: String },
        game_id: { type: Number },
        player_id: { type: Number },
        player_club_id: { type: Number },
        player_current_club_id: { type: Number },
        date: { type: Date },
        player_name: { type: String },
        competition_id: { type: String },
        yellow_cards: { type: Number },
        red_cards: { type: Number },
        goals: { type: Number },
        assists: { type: Number },
        minutes_played: { type: Number }
});

module.exports = mongoose.model('Appearance', appearanceSchema, 'appearances');
