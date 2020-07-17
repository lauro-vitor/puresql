const {updateApplicationPersons} = require('../../application/persons');

const updateControllerPersons = async (person, id) => {
    return await updateApplicationPersons(person, id);
}

module.exports = updateControllerPersons;