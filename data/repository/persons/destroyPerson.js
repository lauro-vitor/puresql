
const getConnection = require('../connectionFactory');
const messageErrorPerson = require('./error/messageErrorPerson');
const response = require('../../../utils/response');

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

        connection.connect();

        connection.beginTransaction(error => {

            if(error) {
                return reject(response(true, null, {... error}));
            }

            connection.query(sql, id, (error, results) => {
                if(error) {
                   return connection.rollback( () => {
                        message = messageErrorPerson({... error});
                        reject(response(true, null, message));
                   });
                }

                if(results.affectedRows == 1) {
                    resolve(response(false, null,'Person excluído com sucesso!' ));
                    return;
                } 
                resolve(response(true, null,'Person não existe!'));
            });

            connection.commit(error =>{
                if(error){
                    return reject(response(true, null, {...error}));
                }
            });

            connection.end();
        });
    });
}


module.exports = destroyPerson;