const getConnection = require('../connectionFactory');
const response = require('../../../utils/response');
const messageErrorUser = require('./error/messageErrorUser');

const getAllUser = async () => {
  try {
    return await getAll();
  } catch (error) {
    return error;
  }
}

const getAll = () => {

    return new Promise((resolve, reject) => {

        const connection = getConnection();

        let sql = 'SELECT * FROM Users';

        let users = [];

        let message = '';

        connection.connect();

        connection.query(sql, (error, results) => {

            if(error) {
                message = messageErrorUser({... error});
                return reject(response(true, null, message));
            }

            if(results.length > 0) {
              results.map(result => {
                users.push({...result});
              });
              resolve(response(false, {users:users}, 'success!'));
              return;
            }
            resolve(response(true, null, 'Não existe usuários!'));
        });

        connection.end();
    });
}

module.exports = getAllUser;