const getConnection = require('../connectionFactory');
const messageErrorUser = require('./error/messageErrorUser');
const response = require('../../../utils/response');

const destroyUser = async id  => {
    try {
        return await destroy(id);
    } catch (error) {
        return error;
    }
}

const destroy = id => {

    return new Promise((resolve, reject) => {
       const connection = getConnection();

       const sql = `DELETE FROM Users WHERE id = ?`;

       let message = '';

       connection.connect();

       connection.beginTransaction(error => {
           
           if(error){
                return reject(error);
           }

           connection.query(sql, id, (error, results) => {
                if(error) {
                    return connection.rollback(() => {
                       message = messageErrorUser({... error});
                       reject(response(true, null, message));
                    });
                }
                if (results.affectedRows == 1) {
                    resolve(response(false, null,'success!'));
                    return;
                }
                resolve(response(true, null,'falha ao excluir usuário!'));

            });

            connection.commit(error  => {
                if(error) {
                    return reject(error);
                }
            });
            connection.end();
       });
    });
}

module.exports = destroyUser;