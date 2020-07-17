const getConnection = require('../connectionFactory');
const hasOne = require('./relations/hasOne');   
const messageErrorPerson = require('./error/messageErrorPerson');
const response = require('../../../utils/response');

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


        connection.connect();

        connection.query(sql, id, async (error, results) => {

            if(error) {
                message = messageErrorPerson({...error});
                return reject(response(true, null, message));
            }

            if(results.length > 0 ) {
                resolve(response(false, {person:hasOne(results[0])}, 'success!'));
                return;
            }
            resolve(response(true, null, 'Person não existe!'));
            
        });

        connection.end();
    });
}

module.exports = getPersonById;