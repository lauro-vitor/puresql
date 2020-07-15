const getConnection = require('../connectionFactory');
const getPersonById = require('./getPersonById');
const messageErrorPerson = require('./error/messageErrorPerson');

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
                return  reject(error);
            }

            connection.query(sql, inserts, async (error, results) =>{
                if(error){
                    return connection.rollback(() => {
                        message =  messageErrorPerson({... error});
                        res = response(null, message);
                        reject(res);
                    });
                }

                if(results.changedRows == 1){
                    let {person} = await getPersonById(id);
                    res = response(person, 'Person Alterado com sucessso!');
                    resolve(res);
                }
               
            });

            connection.commit(error =>{
                if(error) {
                    return connection.rollback(()=> {
                        reject(error);
                    });
                }
            });
            connection.end();
        });
    });
}
const response = (person, message) => {
    return({
        person,
        message,
    });
}
module.exports = updatePerson;