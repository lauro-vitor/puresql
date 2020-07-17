const {destroyPerson} = require('../../data/repository/persons');

const destroyPersonApplication = async id => {
    return await destroyPerson(id);
}
module.exports = destroyPersonApplication;