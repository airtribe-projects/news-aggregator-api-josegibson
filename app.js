require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/userRoutes');
const newsRoutes = require('./routes/newsRoutes');

app.get('/', (req, res) => {
    res.send('Welcome to the News Aggregator API');
});

app.use('/users', userRoutes);
app.use('/news', newsRoutes);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;