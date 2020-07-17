const {getPersonById} = require('../../data/repository/persons');

const showApplicationPerson = async id => {
    return await getPersonById(id);
}

module.exports = showApplicationPerson;