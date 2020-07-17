const {destroyApplicationPersons} = require('../../application/persons');

const destroyControllerPersons = async id => {
    return await destroyApplicationPersons(id);
}

module.exports =  destroyControllerPersons;