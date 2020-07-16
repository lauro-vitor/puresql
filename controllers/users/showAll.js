const {getAllUsers} = require('../../data/repository/users/userProvider');

const showAllUsers = async () => {
    return await getAllUsers();
}
module.exports = showAllUsers;