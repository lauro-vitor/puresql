const {createPerson} = require('../../data/repository/persons');
const validatePerson = require('../../services/persons');

const storeApplicationPerson = async person => {
    let resultValidationPerson = validatePerson(person);
    if(!resultValidationPerson.error){
        return await createPerson(person);
    }
    return resultValidationPerson;
}
module.exports = storeApplicationPerson;