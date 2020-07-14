const getConnection = require('../connectionFactory');
const getUserById = require('../users/getUserById');

const getAllPersons = () => {
    return new Promise((resolve, reject) => {
        const connection = getConnection();
        const sql = `
            SELECT * 
            FROM Persons 
            INNER JOIN Users
            ON Persons.id = Users.id`;

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
                results.map( result => {
                    
                });
                resolve(persons);
            });

            connection.end();
        });
    });
}

module.exports = getAllPersons;