const getConnection = require('../connectionFactory');
const getPersonById = require('./getPersonById');
const messageErrorPerson = require('./error/messageErrorPerson');

const createPerson = async person => {
    try {
        return await create(person);
    } catch (error) {
        return error;
    }
}

const create = person => {
    
    return new Promise((resolve, reject) => {

        const connection = getConnection();

        const sql = 
            `INSERT INTO 
            Persons (name, isBetaMember, userId, createdAt, updatedAt )
            VALUES (?, ?, ?, now(), now())`;

        const inserts = [person.name, person.isBetaMember, person.userId];

        let message = '';

        let res = null;

        connection.connect();

        connection.beginTransaction(error => {
            if(error) {
                return reject(error);
            }

            connection.query(sql, inserts, async (error, results) => {

                if(error) {
                    return connection.rollback(() => {
                        message = messageErrorPerson({... error});
                        res = response(null, message);
                        reject(res);
                    });
                }

                let {person} =  await getPersonById(results.insertId);
                res =  response(person, 'Person adiconado com sucesso!');
                resolve(res);

            });
            connection.commit(error => {

                if(error) {
                   return connection.rollback(() =>{
                       return reject(error);
                   });
                }

            });
            
            connection.end();
        });
    });
}
const response = (person, message) =>{
    return {
        person,
        message
    };
}
module.exports = createPerson;