const getConnection = require('../connectionFactory');
const getPersonById = require('./getPersonById');

const createPerson = person => {
    return new Promise((resolve, reject) => {
        const connection = getConnection();
        const sql = 
            `INSERT INTO 
            Persons (name, isBetaMember, userId, createdAt, updatedAt )
            VALUES (?, ?, ?, now(), now())`;
        const inserts = [person.name, person.isBetaMember, person.userId];
        let newPerson = null;

        connection.connect();

        connection.beginTransaction(error => {
            if(error){
                return reject(error);
            }

            connection.query(sql, inserts, async (error, results) => {
                if(error){
                    return reject(error);
                }
                 newPerson = getPersonById(results.insertId);
                resolve(newPerson);
            });
            connection.commit(error => {
                if(error){
                    return reject(error);
                }
            });
            
            connection.end();
        });
    });
}
module.exports = createPerson;