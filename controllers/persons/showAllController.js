const {showAllApplication} = require('../../application/persons');

const showAllController = async () => {
    return await showAllApplication();
}
module.exports = showAllController;