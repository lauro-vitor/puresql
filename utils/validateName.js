const validateName = name => {
    
    if(!name ) {
        return response(true, 'nome ou sobrenome não existe!');
    }

    if(name.length < 3) {
        return response(true, 'nome deve possuir  3 ou mais caracteres!');
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