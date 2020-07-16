const {showAllApplication} = require('../../application/user');

const showAllController = async () => {
    return await showAllApplication();
}
module.exports = showAllController;  