const {storeApplicationUser} = require('../../application/user');

const storeControllerUser = async user => {
    return await storeApplicationUser(user);
}
module.exports = storeControllerUser;