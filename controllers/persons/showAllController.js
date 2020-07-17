const {showAllApplicationPersons} = require('../../application/persons');

const showAllController = async () => {
    return await showAllApplicationPersons();
}
module.exports = showAllController;