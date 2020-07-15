
const getConnection = require('../connectionFactory');
const messageErrorPerson = require('./error/messageErrorPerson');

const destroyPerson = async id => {
    try {
        return await destroy(id);
    } catch (error) {
        return error;
    }
}

const destroy = id => {

    return new Promise((resolve, reject) => {

        const connection = getConnection();

        const sql = `DELETE FROM Persons WHERE id =  ?`;

        let message =  '';

        let res = null;

        connection.connect();

        connection.beginTransaction(error => {

            if(error) {
                return reject(error);
            }

            connection.query(sql, id, (error, results) => {
                if(error) {
                   return connection.rollback( () => {
                        message = messageErrorPerson({... error});
                        res = response(message, false);
                        reject(res);
                   });
                }

                if(results.affectedRows == 1) {
                    res = response('Person excluído com sucesso!', true);
                    resolve(res);
                } else {
                    res = response('Person não existe!', false);
                    resolve(res);
                }

            });

            connection.commit(error =>{
                if(error){
                    return reject(error);
                }
            });

            connection.end();
        });
    });
}

const response = (message, deleted) => {
    return {
        message,
        deleted,
    }
}

module.exports = destroyPerson;