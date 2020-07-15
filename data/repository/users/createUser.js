const getConnection = require('../connectionFactory');
const getUserById = require('./getUserById');
const messageErrorUser = require('./error/messageErrorUser');

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
        let res = '';

        connection.beginTransaction(error => {
            
            if(error){
               return reject(error);
            }
            connection.query(sql, inserts, async (error, results) => {
                if(error){
                   return connection.rollback(() => {
                        message = messageErrorUser({... error});
                        res = response(null, message);
                        reject(res);
                    });
                }

                if(results.affectedRows == 1){
                    let {user} = await getUserById(results.insertId);
                    res = response(user, 'Usuário adicionado!');
                    resolve(res);
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
const response = (user, message) => {
    return {
        user,
        message
    }
}
module.exports = createUser;