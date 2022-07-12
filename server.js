const path = require('path')
const express = require('express');
const db = require('./config/connection');
var colors = require('colors');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('./controllers'));


db.once('open', () => {
    app.listen(PORT, () => {
    console.log("-----------------------".bgBlue)
    console.log("--API Running on PORT--".bgBlue, PORT)
    console.log("-----------------------".bgBlue)
    
    });
});
