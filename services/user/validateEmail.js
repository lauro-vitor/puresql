const validator = require('validator');

const validateEmail = email => {
    
    if(!email) {
        return response(true, 'Email não existe!');
    }
    if(!validator.isEmail(email)) {
        return response(true, 'email inválido!');
    }

    return response(false, 'sucess!');
}
const response = (error, message) =>{
    return {
        error,
        message
    }
}
module.exports = validateEmail;