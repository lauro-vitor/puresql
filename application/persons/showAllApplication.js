const {getAllPersons} = require('../../data/repository/persons');

const showAllApplication = async () => {
    return await getAllPersons();
}

module.exports = showAllApplication;