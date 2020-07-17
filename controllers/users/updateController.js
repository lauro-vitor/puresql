const {updateApplicationUser} = require('../../application/user');

const updateControllerUser = async (user, id) => {
    return await updateApplicationUser(user, id);
}
module.exports = updateControllerUser;