const getConnection = require('../connectionFactory');
const hasOne = require('./relations/hasOne');

const getPersonById = id => {
    return new Promise((resolve, reject) => {
        const connection = getConnection();
        const sql = `
            SELECT
                p.id, 
                p.name, 
                p.isBetaMember, 
                p.userId, 
                p.createdAt as pCreatedAt, 
                p.updatedAt as pUpdatedAt,
                u.firstName,
                u.lastName,
                u.email,
                u.createdAt as uCreatedAt,
                u.updatedAt as uUpdatedAt
            FROM Persons as p
            JOIN Users as u
            ON p.userId = u.id
            WHERE p.id = ?`;

        connection.connect();

        connection.query(sql, id, async (error, results) => {
            if(error){
                return reject(error);
            }

            let person = hasOne(results[0]);
            resolve(person);
            
        });
        connection.end();
    });
}
module.exports = getPersonById;