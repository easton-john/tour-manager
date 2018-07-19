const router = require('express').Router();
const Tour = require('../models/tour');

module.exports = router
    .post('/', (req, res) => {
        Tour.create(req.body)
            .then(tour => res.json(tour));
    })
    .get('/:id', (req, res) => {
        Tour.findById(req.params.id)
            .then(tour => res.json(tour));
    });
