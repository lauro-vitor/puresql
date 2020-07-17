const validateUser = require('../../services/user');
const {updateUser} = require('../../data/repository/users');


const updateApplicationUser = async (user, id) => {
    let responseValidateUser = validateUser(user);
    if(!responseValidateUser.error) {
        return await updateUser(user, id);
    }
    return responseValidateUser;
}   

module.exports = updateApplicationUser;