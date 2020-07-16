const express = require('express');
const router = express.Router();
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
    res.status(400).json(error);
});

router.post('/', async (req, res) => {
    res.status(201).json(await storeController(req.body));
});

router.put('/:id', async (req, res) => {
    if(validateId(req)) {
        res.status(201).json(await updateController(req.body, req.params.id));
        return;
    }
    res.status(400).json(error);
});

router.delete('/:id', async (req, res) => {
    if(validateId(req)) {
        res.status(201).json(await destroyController(req.params.id));
        return;
    }
    res.status(400).json(error);

});
const error = {error:true, message:'id inválido!'};

const validateId = (req) => {
    let regex = /^[0-9]+$/;
    let {id} = req.params;
    return regex.test(id) && id > 0;
}
module.exports = app => app.use('/api/users', router);