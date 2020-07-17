const {destroyUser} = require('../../data/repository/users');

const destroyApplicationUser =  async id => {
    return await destroyUser(id);
}
module.exports = destroyApplicationUser;