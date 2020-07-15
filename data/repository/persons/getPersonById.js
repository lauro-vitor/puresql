const getConnection = require('../connectionFactory');
const hasOne = require('./relations/hasOne');
const messageErrorPerson = require('./error/messageErrorPerson');

const getPersonById =  async id => {
    try {
        return await getById(id);
    } catch (error) {
        return error;
    }
}

const getById = id => {
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

        let message =  '';

        let res = null;

        connection.connect();

        connection.query(sql, id, async (error, results) => {

            if(error) {
                message = messageErrorPerson({...error});
                res = response(null, message);
                return reject(res);
            }

            if(results.length > 0 ) {
                res = response(hasOne(results[0]),'success!');
            } else {
                res = response(null, 'BAD');
            }
            
            resolve(res);
            
        });

        connection.end();
    });
}
const response = (person, message) => {
    return {
        person,
        message
    }
}
module.exports = getPersonById;