const getConnection = require('../connectionFactory');

//resolve -> se existir objeto traz usuário caso contrário null

const getUserById = id => {
    return new Promise((resolve, reject) => {
        const connection = getConnection();
        let user = null;
        const sql = 'SELECT * FROM Users WHERE id = ?';
        connection.connect();

        connection.query(sql, id, (error, results) =>{
            if(error){
                reject(error);
            }
            if(results  && results.length > 0) {
                user = {...results[0]};
            }
            resolve(user);
        });

        connection.end();
    });
}
module.exports = getUserById;