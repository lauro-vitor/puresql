const {getAllUsers} = require('../../data/repository/users');

const showAllApplication = async () => {
    return await getAllUsers();
}

module.exports = showAllApplication;