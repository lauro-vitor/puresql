const getConnection = require('../connectionFactory');
const getUserById = require('../users/getUserById');

const getPersonById = id => {
    return new Promise((resolve, reject) => {
        const connection = getConnection();

        const sql = `
            SELECT * 
            FROM Persons 
            WHERE Persons.id = ?`;

        connection.connect();

        connection.query(sql, id, async (error, results) => {
            if(error){
                return reject(error);
            }
            if(results.length > 0) {
                let user = await getUserById(results[0].userId);
                let person = {... results[0]};
                resolve({...person, user});
            }
        });
        connection.end();
    });
}
module.exports = getPersonById;