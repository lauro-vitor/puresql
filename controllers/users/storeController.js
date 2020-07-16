const {storeApplication} = require('../../application/user');

const storeController = async user => {
    return await storeApplication(user);
}
module.exports = storeController;