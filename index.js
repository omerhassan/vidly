const express = require('express');
const debug = require('debug')('app:startup');
const genres = require('./routes/genres');

const app = express();

app.use(express.json());

debug('[Starting The Express App]')
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));