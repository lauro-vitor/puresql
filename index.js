const {
    createUser, 
    getUserById, 
    getAllUsers,
    updateUser,
    destroyUser} = require('./data/repository/users/userProvider');
const {
    getPersonById, getAllPersons, createPerson, updatePerson, destroyPerson
} = require('./data/repository/persons/personProvider');
const routeUser = require('./routes/user');

const express = require('express');
const app = express();

app.get('/user/:id', (req, res)=>{
    let user = {
        firstName:'exemplo',
        lastName: 'exemplo',
        email: 'exemplo'
    }
    res.json(user);
});
const main = () => {
    
    app.listen(3000, () =>{
        console.log('oi');
    });
}


main();
