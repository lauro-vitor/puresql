const {getAllUsers} = require('../../data/repository/users');

const showAllApplicationUser = async () => {
    return await getAllUsers();
}

module.exports = showAllApplicationUser;