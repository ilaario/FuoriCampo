const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String,},
    password: {type: String},
    email: {type: String},
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const users = mongoose.model('Users', UserSchema, 'users');

module.exports = users;
