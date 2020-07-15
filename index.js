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
       let persons = await getAllPersons();
       persons.map(person => {
           console.log(person);
       })
    //console.log(await getAllPersons());
   }catch(error){
        throw error;
   }
}
main();
