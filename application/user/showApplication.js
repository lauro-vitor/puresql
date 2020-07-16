const {getUserById} = require('../../data/repository/users');

const showApplication = async id => {
    return await getUserById(id);
}
module.exports = showApplication;