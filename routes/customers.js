const mongoose = require('mongoose');
const express = require('express');
const {Customer, validate} = require('../models/customer');

const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
        res.status(404).send('The customer with the given ID was not found.');
        return;
    }
    res.send(customer);
});

router.post('/', async (req, res) => {

    const {error} = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone,
    });

    const  result = await customer.save();
    res.send(result);
});

router.put('/:id', async (req, res) => {
    
    const {error} = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const customer = await Customer.findByIdAndUpdate(req.params.id, { phone: req.body.phone }, 
        {new: true});

    if (!customer) return res.status(404).send('The customer with given ID was not found.')
    res.send(customer);
}); 

router.delete('/:id', async (req, res) => {

    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found.')
    
    res.send(customer);
});

module.exports = router;