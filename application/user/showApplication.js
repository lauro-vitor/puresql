const {getUserById} = require('../../data/repository/users');   

const showApplicationUser = async id => {
    return await getUserById(id);
}
module.exports = showApplicationUser;   