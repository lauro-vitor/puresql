const validateName = name => {
    
    if(!name ) {
        return response(true, 'nome ou sobrenome vazio!');
    }

    if(!name.length > 3) {
        return response(true, 'nome deve possuir mais de 3 caracteres!');
    }
    
    return response(false, 'sucess!');
       
}
const response = (error, message) => {
    return {
        error,
        message
    }
}
module.exports = validateName;