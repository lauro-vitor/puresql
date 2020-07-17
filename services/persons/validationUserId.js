const validator = require('validator');
const validationUserId = person => {
    let {userId} = person;
   
    if(!userId){
        return response(true, 'userId não existe!');
    }
    if(validator.equals((typeof userId),'string') && !validator.isNumeric(userId) ){
        return response(true, 'UserId deve ser somente números!');
    }
    if(userId <= 0){
        return response(true, 'userId deve ser maior do que 0');
    }

    return response(false, 'success!');  
}
const response = (error, message) => {
    return {
        error,
        message
    }
}
module.exports = validationUserId;