const express = require('express');
const app = express();
const path =require('path')
const bodyParser=require('body-parser')
const Library=require('./models/Lib')
app.use(bodyParser.urlencoded({ extended: false }));
//------------------import route
const adminLibraryRoute = require('./Route/adminLibraryRoute');


//------------------------------------------------------------
app.use(express.static(path.join(__dirname,'Public')));
app.use(adminLibraryRoute);




app.use((req, res, next) => {
    res.status(404).send('Not Found');
});



app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
