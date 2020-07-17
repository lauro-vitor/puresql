const {showApplicationPersons} = require('../../application/persons');

const showControllerPerson = async id => {
    return await showApplicationPersons(id);
}

module.exports = showControllerPerson;