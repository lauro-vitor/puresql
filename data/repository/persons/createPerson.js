const getConnection = require('../connectionFactory');
const getPersonById = require('./getPersonById');
const messageErrorPerson = require('./error/messageErrorPerson');
const response = require('../../../utils/response');

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
                return reject(response(true, null, {...error}));
            }

            connection.query(sql, inserts, async (error, results) => {

                if(error) {
                    return connection.rollback(() => {
                        message = messageErrorPerson({... error});
                        reject(response(true, null, message));
                    });
                }

                let {data} =  await getPersonById(results.insertId);
            
                resolve(response(false, data.person, 'Person adicionado com sucesso!'));

            });
            connection.commit(error => {

                if(error) {
                   return connection.rollback(() =>{
                       return reject(response(true, null, {...error}));
                   });
                }

            });
            
            connection.end();
        });
    });
}

module.exports = createPerson;