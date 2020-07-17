const getConnection = require('../connectionFactory');
const messageErrorUser = require('./error/messageErrorUser');
const response = require('../../../utils/response');

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

        connection.connect();

        connection.query(sql, id, (error, results) => {
            
            if(error) {
                message = messageErrorUser({... error});
               
                return reject(response(true, null, message));
            }

            if(results.length > 0) {
                resolve(response(false,  {user:{...results[0]}}, 'success!'));
                return;
            }
            
            resolve(response(true, null, 'Usuário não exsite!'));

        });

        connection.end();
    });
}


module.exports = getUserById;