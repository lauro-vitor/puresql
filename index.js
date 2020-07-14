const {
    createUser, 
    getUserById, 
    getAllUsers,
    updateUser,
    destroyUser} = require('./data/repository/users/userProvider');
const {
    getPersonById, getAllPersons, createPerson
} = require('./data/repository/persons/personProvider');

const main = async () => {
   
    try{
       await getAllPersons();
       
    }catch(error){
        console.warn('in catch clasule!');
        console.log(error);
    }
}
main();
