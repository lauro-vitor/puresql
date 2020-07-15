const getConnection = require('../connectionFactory');
const messageErrorUser = require('./error/messageErrorUser');

const getUserById = async id => {
    try {
        return await getByid(id);
    } catch (error) {
        return error;
    }
}

const getByid = id => {

    return new Promise((resolve, reject) => {

        const connection = getConnection();

        const sql = 'SELECT * FROM Users WHERE id = ?';

        let message = '';
        let res = null;

        connection.connect();

        connection.query(sql, id, (error, results) => {

            if(error) {
                message = messageErrorUser({... error});
                res = response(null, message);
                return reject(res);
            }

            if(results.length > 0) {
                res = response({...results[0]}, 'success!');
                resolve(res);
            }

        });

        connection.end();
    });
}
const response = (user, message) => {
    return {
        user,
        message
    }
}
module.exports = getUserById;