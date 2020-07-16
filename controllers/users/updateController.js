const {updateApplication} = require('../../application/user');

const updateController = async (user, id) => {
    return await updateApplication(user, id);
}
module.exports = updateController;