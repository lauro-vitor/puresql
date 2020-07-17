const getConnection = require('../connectionFactory');
const getPersonById = require('./getPersonById');
const messageErrorPerson = require('./error/messageErrorPerson');
const response = require('../../../utils/response');

const updatePerson = async (person, id) => {
    try {
        return await update(person, id);
    } catch (error) {
        return error;
    }
}

const update = (person, id) => {

    return new Promise((resolve, reject) => {
        const connection = getConnection();
        const sql = `
            UPDATE Persons
            SET name = ?, isBetaMember = ?, userId = ?, updatedAt = now()
            WHERE id = ?
        `;
        const inserts = [
            person.name,
            person.isBetaMember,
            person.userId,
            id
        ];
        
        connection.beginTransaction(error => {
            if(error) {
                return  reject(response(true, null, {...error}));
            }

            connection.query(sql, inserts, async (error, results) =>{
                if(error){
                    return connection.rollback(() => {
                        message =  messageErrorPerson({... error});
                        reject(response(true, null, message));
                    });
                }

                if(results.changedRows == 1) {
                    let {data} = await getPersonById(id);
                    resolve(response(false, data.person, 'Person Alterado com sucessso!'));
                }
               
            });

            connection.commit(error =>{
                if(error) {
                    return connection.rollback(()=> {
                        reject(response(true, null, {... error}));
                    });
                }
            });
            connection.end();
        });
    });
}

module.exports = updatePerson;