const getConnection = require('../connectionFactory');
const getUserById = require('./getUserById');
const messageErrorUser = require('./error/messageErrorUser');
const response = require('../../../utils/response');

const createUser = async user => {
    try {
        return await create(user);
    } catch (error) {
        return error;
    }
}

const create = user => {    
    return new Promise( (resolve, reject) => {
        
        const connection =  getConnection();

        let sql = 
            `INSERT INTO Users(firstName, lastName, email, createdAt,updatedAt) 
            VALUES (?, ?, ?, now(), now())`;

        let inserts = [user.firstName, user.lastName, user.email];

        let message = '';

        connection.beginTransaction(error => {
            
            if(error){
               return reject(error);
            }
            connection.query(sql, inserts, async (error, results) => {
                if(error){
                   return connection.rollback(() => {
                        message = messageErrorUser({... error});
                        reject(response(true, null, message));
                    });
                }

                if(results.affectedRows == 1){
                    let {data} = await getUserById(results.insertId);
                    resolve(response(false, {user:data.user}, 'Usuário adicionado!'));
                }
            });
            
            connection.commit(error => {
              if(error) {
                  connection.rollback(() =>{
                    throw error;
                  });
                  reject(error);
              }
            });
            connection.end();
        });
    });
}

module.exports = createUser;