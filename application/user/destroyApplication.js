const {destroyUser} = require('../../data/repository/users');

const destroyApplication =  async id => {
    return await destroyUser(id);
}
module.exports = destroyApplication;