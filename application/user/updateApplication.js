const validateUser = require('../../services/user');
const {updateUser} = require('../../data/repository/users');


const updateApplication = async (user, id) => {
    let responseValidateUser = validateUser(user);
    if(!responseValidateUser.error) {
        return await updateUser(user, id);
    }
    return responseValidateUser;
}

module.exports = updateApplication;