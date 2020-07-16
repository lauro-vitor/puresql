const express = require('express');
const router = express.Router();
const {showAllUsers} = require('../controllers/users');

router.get('/', async (req, res) => {
    res.json(await showAllUsers());
});
router.get('/:id', (req, res) => {
    res.send('oi você fez uma request get user/id')
});
module.exports = app => app.use('/users', router);