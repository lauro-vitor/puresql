const {showApplication} =  require('../../application/user');

const showController = async id => {
    return await showApplication(id);
}

module.exports = showController;