const getConnection = require('../connectionFactory');

const getAllUser = async () => {
  try {
    return await getAll();
  } catch (error) {
    return error;
  }
}

const getAll = () => {

    return new Promise((resolve, reject) => {

        const connection = getConnection();

        let sql = 'SELECT * FROM Users';

        let users = [];

        connection.connect();

        connection.query(sql, (error, results) => {

            if(error) {
                return reject(error);
            }

            if(results.length > 0) {
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