// não esquecer de olhar o body-parser
const express = require('express');
const app = express();
require('./routes/')(app);

const main = () => {
    
    app.listen(3000, () =>{
      
    });
}


main();
