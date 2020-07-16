const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('request in  persosns');
});

module.exports = app => app.use('/api/persons', router);