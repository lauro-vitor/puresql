const validateName = require('../../utils/validateName');
const validationIsBetaMember = require('./validationIsBetaMember');
const validationUserId = require('./validationUserId');

const validatePerson = person => {
    let responseValidatePerson = validateName(person.name);
    let responsevalidationIsBetaMember = validationIsBetaMember(person);
    let responsevalidationUserId = validationUserId(person);

    let response = {
        error: false,
        data:null,
        messages:[],
    }
    if(responseValidatePerson.error){
        response.error = true;
        response.messages.push(responseValidatePerson.message);
    }
    if(responsevalidationIsBetaMember.error){
        response.error = true;
        response.messages.push(responsevalidationIsBetaMember.message);
    }
    if(responsevalidationUserId.error){
        response.error = true;
        response.messages.push(responsevalidationUserId.message);
    }
    return response;
}
module.exports = validatePerson;