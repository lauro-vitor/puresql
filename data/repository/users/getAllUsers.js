const getConnection = require('../connectionFactory');

const getAllUser = () => {
    return new Promise((resolve, reject) => {
        const connection = getConnection();
        let sql = 'SELECT * FROM Users';
        let users = [];
        connection.connect();
        connection.query(sql, (error, results) => {
            if(error){
                reject(error);
                return;
            }
            if(results  && results.length > 0){
              results.map(result => {
                users.push({...result});
              });
              resolve(users);
            }
        });
        connection.end();
    });
}
module.exports = getAllUser;