const getConnection = require('../connectionFactory');
const getUserById = require('./getUserById');

const updateUser = (user, id) => {
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

        let updatedUser = null;

        connection.beginTransaction(error => {
            if(error) {
                return reject(error);
            }

            connection.query(sql, inserts, (error, results) => {
                if(error) {
                    return connection.rollback(() => {
                        return reject(error);
                    });
                }

                updatedUser = getUserById(id);
                resolve(updatedUser);
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