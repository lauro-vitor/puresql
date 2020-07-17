const {showApplicationUser} =  require('../../application/user');

const showControllerUser = async id => {
    return await showApplicationUser(id);
}

module.exports = showControllerUser;    