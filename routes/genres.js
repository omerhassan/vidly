const {Genre, validate} = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
        res.status(404).send('The genre with the given ID was not found.');
        return;
    }
    res.send(genre);
});

router.post('/', auth, async (req, res) => {

    const {error} = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const genre = new Genre({
        name: req.body.name
    });

    const  result = await genre.save();
    res.send(result);
});

router.put('/:id', async (req, res) => {
    
    const {error} = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name }, 
        {new: true});

    if (!genre) return res.status(404).send('The genre with given ID was not found.')
    res.send(genre);
}); 

router.delete('/:id', [auth, admin], async (req, res) => {

    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.')
    
    res.send(genre);
});

module.exports = router;