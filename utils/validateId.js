const validateId = (req) => {
    let regex = /^[0-9]+$/;
    let {id} = req.params;
    return regex.test(id) && id > 0;
}
const errorId = {error:true, data:null, messages:['id inválido!']};

module.exports = {validateId, errorId};