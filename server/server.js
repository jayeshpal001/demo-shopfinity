
const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const dbConnection = require('./config/dbConnection');
const router = require('./routes/userRoutes');
require('dotenv').config();


const app = express(); 
app.use(express.json()); 

const PORT = process.env.PORT
dbConnection(); 

app.use('/users', router)

app.use(errorHandler); 
app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
    
})