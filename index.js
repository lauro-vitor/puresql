// não esquecer de olhar o body-parser  
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
require('./routes/')(app);

const main =  ()  => {
    app.listen(3000, () =>{
      
    });
}
main();
