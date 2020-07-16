const getPersonById = require('./getPersonById');
const getAllPersons = require('./getAllPersons');
const createPerson = require('./createPerson');
const updatePerson = require('./updatePerson');
const destroyPerson = require('./destroyPerson');

module.exports = {
    getPersonById,
    getAllPersons,
    createPerson,
    updatePerson,
    destroyPerson
};