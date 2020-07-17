const validateName = require('../../utils/validateName');
const validateEmail = require('./validateEmail');

const validateUser = user => {
   let responseValidationName = validateName(user.firstName);
   let responseValidationLastName = validateName(user.lastName);
   let responseValidationEmail = validateEmail(user.email);
   let error = false;
   let messages = [];
 
   if( responseValidationName.error ) {
       error = true;
       messages.push(responseValidationName.message);
   }
   if(responseValidationLastName.error){
        error = true;
        messages.push(responseValidationLastName.message);
   }
   if(responseValidationEmail.error){
    error = true;
    messages.push(responseValidationEmail.message);
   }
   return {
       error,
       data: null,
       messages,
   }
}



module.exports = validateUser;