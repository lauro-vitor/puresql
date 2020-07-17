const express = require('express');
const router = express.Router();
const {validateId, errorId} = require('../utils/validateId');
    
const {
    showAllControllerUser,  
    showControllerUser, 
    storeControllerUser, 
    updateControllerUser,
     destroyControllerUser } = require('../controllers/users');

router.get('/', async (req, res) => {
    res.json(await showAllControllerUser());
});

router.get('/:id', async (req, res) => {
  
    if(validateId(req)) {
        res.status(200).json(await showControllerUser(req.params.id));
        return;
    }
    res.status(400).json(errorId);
});

router.post('/', async (req, res) => {
    res.status(201).json(await storeControllerUser(req.body));
});

router.put('/:id', async (req, res) => {
    if(validateId(req)) {
        res.status(201).json(await updateControllerUser(req.body, req.params.id));
        return;
    }
    res.status(400).json(errorId);
});

router.delete('/:id', async (req, res) => {
    if(validateId(req)) {
        res.status(201).json(await destroyControllerUser(req.params.id));
        return;
    }
    res.status(400).json(errorId);

});


module.exports = app => app.use('/api/users', router);