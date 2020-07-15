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



app.get('/persons/:id', (req, res)=>{
    let user = {
        firstName:'exemplo',
        lastName: 'exemplo',
        email: 'exemplo'
    }
    res.json(user);
});
