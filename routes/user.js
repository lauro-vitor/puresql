const express = require('express');
const router = express.Router();
const {validateId, errorId} = require('../utils/validateId');
    
const {
    showAllController,  
    showController, 
    storeController, 
    updateController,
     destroyController } = require('../controllers/users');

router.get('/', async (req, res) => {
    res.json(await showAllController());
});

router.get('/:id', async (req, res) => {
  
    if(validateId(req)) {
        res.status(200).json(await showController(req.params.id));
        return;
    }
    res.status(400).json(errorId);
});

router.post('/', async (req, res) => {
    res.status(201).json(await storeController(req.body));
});

router.put('/:id', async (req, res) => {
    if(validateId(req)) {
        res.status(201).json(await updateController(req.body, req.params.id));
        return;
    }
    res.status(400).json(errorId);
});

router.delete('/:id', async (req, res) => {
    if(validateId(req)) {
        res.status(201).json(await destroyController(req.params.id));
        return;
    }
    res.status(400).json(errorId);

});


module.exports = app => app.use('/api/users', router);