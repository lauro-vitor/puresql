const getConnection = require('../connectionFactory');
const hasOne = require('./relations/hasOne');
const response = require('../../../utils/response');
const messageErrorPerson = require('./error/messageErrorPerson');

const getAllPersons = async () => {
    try {
        return await getAll();
    } catch (error) {
        return error;
    }
}
const getAll = () => {

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
        let message = '';

        connection.connect();

        connection.query(sql,  (error, results) => {

            if(error) {
                message = messageErrorPerson({... error});
                return reject(response(true, null, message));
            }

            if(results.length > 0) {

                results.map(result => {
                    let person = hasOne(result);
                    persons.push(person);
                });

                resolve(response(false, {persons:persons}, 'sucess!'));
                return;
            }
            resolve(response(true, null, 'não possui Persons registradas!'));
        });
        
        connection.end();

    });
}

module.exports = getAllPersons;