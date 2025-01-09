const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./config/db')

require('dotenv').config()
PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

connectDB();

app.use('/user', require('./routes/userRoutes'))


app.listen(PORT, (req, res) => {
    console.log(`Listening on port: ${PORT}`)
})

