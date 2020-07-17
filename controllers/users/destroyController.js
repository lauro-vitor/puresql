const {destroyApplicationUser} = require('../../application/user');

const destroyControllerUser = async id => {
    return await destroyApplicationUser(id);
}

module.exports = destroyControllerUser;