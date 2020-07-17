
const validationIsBetaMember = person => {
    if(person.isBetaMember  == null) {
        return response(true, 'isBetaMember Não existe!');
    }
    return response(false, 'success!');
}
const response = (error, message) => {
    return {
        error,
        message
    }
}

module.exports = validationIsBetaMember;