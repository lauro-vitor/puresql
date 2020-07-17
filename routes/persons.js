const express = require('express');
const router = express.Router();
const {validateId, errorId} = require('../utils/validateId');
const {
    showAllControllerPersons,
    showControllerPersons,
    storeControllerPersons,
    destroyControllerPersons,
    updateControllerPersons
} = require('../controllers/persons');

router.get('/', async (req, res) => {
    res.status(200).json(await showAllControllerPersons());
});

router.get('/:id',async (req, res) => {

    if(validateId(req)) {
        res.status(200).json(await showControllerPersons(req.params.id));
        return;
    }
    res.status(400).json(errorId);
    
});
router.post('/', async (req, res) => {
   
    res.status(201).json(await storeControllerPersons(req.body));

});

router.put('/:id', async (req, res) => {
    if(validateId(req)) {
        res.status(201).json(await updateControllerPersons(req.body, req.params.id));
        return;
    }
    res.status(400).json(errorId);
});

router.delete('/:id', async (req, res) => {
    if(validateId(req)) {
        res.status(201).json(await destroyControllerPersons(req.params.id));
        return;
    }
    res.status(400).json(errorId);
});


module.exports = app => app.use('/api/persons', router);