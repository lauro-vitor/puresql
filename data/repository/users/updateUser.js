const getConnection = require('../connectionFactory');
const getUserById = require('./getUserById');
const messageErrorUser = require('./error/messageErrorUser');

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
                        res = response(null, message);
                        reject(res);
                    });
                }
                if(results.changedRows == 1) {
                    let {user} = await getUserById(id);
                    res = response(user, 'Usuário atualizado com sucesso!');
                    resolve(res);
                }
            });

            connection.commit(error => {
                if(error)
                    return reject(error);
            });

            connection.end();
        });
    });
}
const response = (user, message) => {
    return {
        user,
        message
    };
}
module.exports = updateUser;