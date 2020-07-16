const validateUser = require('../../services/user');
const {createUser} = require('../../data/repository/users');

const storeApplication =  async user => {
    let responseValidateUser = validateUser(user);

    if(!responseValidateUser.error) {
        return await createUser(user);
    }
    return responseValidateUser;
}

module.exports = storeApplication;