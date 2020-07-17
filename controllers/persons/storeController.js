const {storeApplicationPersons} = require('../../application/persons');

const storeControllerPersons = async person => {
    return await storeApplicationPersons(person);
}

module.exports = storeControllerPersons;