const {destroyApplication} = require('../../application/user');

const destroyController = async id => {
    return await destroyApplication(id);
}

module.exports = destroyController;