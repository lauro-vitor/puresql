const getConnection = require('../connectionFactory');
const messageErrorUser = require('./error/messageErrorUser');

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
                       res = response(false, message);
                       reject(res);
                    });
                }
                if (results.affectedRows == 1) {
                    res = response(true, 'success!');
                    resolve(res);
                    return;
                }
                resolve(response(false, 'Fail'));

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
const response = (deleted, message) => {
    return {
        deleted,
        message,
    }
}
module.exports = destroyUser;