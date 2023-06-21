const mongoose = require('mongoose');
const express = require('express');
const debug = require('debug')('app:startup');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connected to MongoDB...', err));

const app = express();

app.use(express.json());

debug('[Starting The Express App]')

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));