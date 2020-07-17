const {getAllPersons} = require('../../data/repository/persons');

const showAllApplicationPersons = async () => {
    return await getAllPersons();
}

module.exports = showAllApplicationPersons;