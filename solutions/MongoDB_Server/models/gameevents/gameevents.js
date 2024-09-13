const mongoose = require('mongoose');

const gameevents = new mongoose.Schema({
    game_event_id: { type: String },
    date: { type: Date },
    game_id: { type: Number },
    minute: { type: Number },
    type: { type: String },
    club_id: { type: Number },
    player_id: { type: Number },
    description: { type: String },
    player_in_id: { type: Number, default: null }, // Considerato opzionale, default a null se non fornito
    player_assist_id: { type: Number, default: null } // Considerato opzionale, default a null se non fornito
});

const gameeventsSchema = mongoose.model('GameEvents', gameevents, 'gameevents');

module.exports = gameeventsSchema;

