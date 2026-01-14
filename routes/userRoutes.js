const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateSignup, validateLogin } = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');

const users = require('../models/userModel');

router.post('/signup', validateSignup, async (req, res) => {
    const { name, email, password, preferences } = req.body;

    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { name, email, password: hashedPassword, preferences };
        users.push(newUser);

        res.status(200).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating user' });
    }
});

router.post('/login', validateLogin, async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const access_token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || 'secretKey', { expiresIn: '1h' });
    res.status(200).json({ token: access_token });
});


router.get('/preferences', authenticate, (req, res) => {
    const user = users.find(u => u.email === req.user.email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ preferences: user.preferences });
});

router.put('/preferences', authenticate, (req, res) => {
    const user = users.find(u => u.email === req.user.email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const { preferences } = req.body;
    if (!preferences || !Array.isArray(preferences)) {
        return res.status(400).json({ message: 'Preferences must be an array' });
    }

    user.preferences = preferences;
    res.status(200).json({ message: 'Preferences updated successfully', preferences: user.preferences });
});

module.exports = router;

