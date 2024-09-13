const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const mongoose = require('mongoose');

exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.query;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ _id: new mongoose.Types.ObjectId(), username, password: hashedPassword, email });
        await user.save();

        // Generate a JWT token
        const token = jwt.sign({ _id: user._id }, 'your-secret-key');

        res.status(201).send({ user, token }); // Send the token to the client
    } catch (error) {
        console.error('Errore durante la registrazione:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.query;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }

        // Compare the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ _id: user._id }, 'your-secret-key');

        res.send({ user, token }); // Send the token to the client
    } catch (error) {
        console.error('Errore durante il login:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};
