const express = require('express');
const router = express.Router();
const axios = require('axios');
const authenticate = require('../middlewares/authenticate');
const users = require('../models/userModel');

router.get('/', authenticate, async (req, res) => {
    const user = users.find(u => u.email === req.user.email);
    const userPreferences = user ? user.preferences : [];

    if (userPreferences.length === 0) {
        return res.status(200).json({ news: [], message: 'No preferences set. Add categories like "technology" or "sports" to see news.' });
    }

    const query = userPreferences.join(' OR ');

    try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: query,
                apiKey: process.env.NEWS_API_KEY,
                sortBy: 'publishedAt',
                pageSize: 10
            }
        });

        res.status(200).json({ news: response.data.articles });
    } catch (err) {
        console.error('Error fetching news:', err.message);
        res.status(500).json({ message: 'Error fetching real news from NewsAPI' });
    }
});

module.exports = router;
