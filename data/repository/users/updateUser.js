const getConnection = require('../connectionFactory');
const getUserById = require('./getUserById');
const messageErrorUser = require('./error/messageErrorUser');
const response = require('../../../utils/response');

const updateUser = async (user, id) => {
    try {
        return await update(user, id);
    } catch (error) {
        return error;
    }
}

const update = (user, id) => {
    return new Promise((resolve,  reject) => {

        const connection = getConnection();

        const sql = 
            `UPDATE Users 
             SET 
                firstName = ?, 
                lastName = ?,
                email = ?,
                updatedAt = now()
            WHERE id = ?`;

        const inserts = [
            user.firstName,
            user.lastName,
            user.email,
            id
        ];

        let message = '';
        let res = '';

        connection.beginTransaction(error => {
            if(error) {
                return reject(error);
            }

            connection.query(sql, inserts, async (error, results) => {
                if(error) {
                    return connection.rollback(() => {
                        message = messageErrorUser({... error});
                        reject(response(true, null, message));
                    });
                }
                if(results.changedRows == 1) {
                    let {data} = await getUserById(id);
                    resolve(response(false, {user:data.user}, 'Usuário atualizado com sucesso!'));
                    return;
                }
                resolve(response(true, null,'Não foi possível atualizar usuário!'));
            });

            connection.commit(error => {
                if(error)
                    return reject(error);
            });

            connection.end();
        });
    });
}

module.exports = updateUser;