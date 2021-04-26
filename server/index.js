const express = require('express');
const connectDB = require('./config/db');

//create server
const app = express();

//connect to db
connectDB();

//app port
const PORT = process.env.PORT || 4000;

//define app
app.get('/', (req, res) => {
        res.send('Hello World');
    })
    //launch server
app.listen(PORT, () => {
    console.log(`Server working at ${PORT}`);
})