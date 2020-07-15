const getConnection = require('../connectionFactory');
const hasOne = require('./relations/hasOne');

const getAllPersons = () => {
    return new Promise((resolve, reject) => {
        const connection =  getConnection();
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
            ON p.userId = u.id`;

        let persons = [];

        connection.connect();

        connection.beginTransaction(error =>{
            if(error){
                return reject(error);
            }
            connection.query(sql,  (error, results) => {
                if(error){
                    return reject(error);
                }
                results.map(result => {
                    let person = hasOne(result);
                    persons.push(person);
                });
                resolve(persons);
            });

            connection.end();
        });
    });
}

module.exports = getAllPersons;