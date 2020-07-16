const express = require('express');
const router = express.Router();
const {validateId, errorId} = require('../utils/validateId');
const {showAllController} = require('../controllers/persons');

router.get('/', async (req, res) => {
    res.status(200).json(await showAllController());
});

router.get('/:id', (req, res) => {

});
router.post('/', (req, res) => {

});

router.put('/', (req, res) => {

});

router.delete('/:id', (req, res) => {

});


module.exports = app => app.use('/api/persons', router);