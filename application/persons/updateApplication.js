const {updatePerson} = require('../../data/repository/persons');
const validatePerson = require('../../services/persons');

const updatePersonApplication = async (person, id) => {
    let resultValidationPerson = validatePerson(person);
    if(!resultValidationPerson.error){
        return await updatePerson(person, id);
    }
    return resultValidationPerson;
}

module.exports = updatePersonApplication;