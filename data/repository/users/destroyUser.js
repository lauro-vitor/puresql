const getConnection = require('../connectionFactory');
//return a boolean value
const destroyUser = id => {

    return new Promise((resolve, reject) => {
       const connection = getConnection();

       const sql = `DELETE FROM Users WHERE id = ?`;

       let deleted = false;

       connection.connect();

       connection.beginTransaction(error => {
           
           if(error){
                return reject(error);
           }

           connection.query(sql, id, (error, results) => {
                if(error) {
                    return connection.rollback(() => {
                        return reject(error);
                    });
                }
                deleted = (results.affectedRows == 1) ? true : false;
                resolve(deleted);
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