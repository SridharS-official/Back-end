require("dotenv").config()
const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const app = express();
const connectDB = require('./config/dbConn');
const taskRouter=require('./routes/taskRoutes')
const projectRouter=require('./routes/projectRoutes')
const authentication=require('./routes/auth')
const getPrivateData=require('./routes/private')
const errorHandler=require('./middleware/error')
const bodyParser = require('body-parser');
const PORT=process.env.PORT||8080
//const PORT=5000
const cors=require('cors')
const logger=require('morgan')


app.use(express.json())//parsing 
app.use(cors())//to handle wrong port number
app.use(logger('dev'))
app.use(fileUpload())
connectDB();

app.use('/server/auth',authentication)
app.use('/task',taskRouter)
app.use('/server',projectRouter)
app.use('/server/private',getPrivateData)

app.use(errorHandler)

// always last



mongoose.connection.once("open",()=>{ console.log(`Mongoo is connected 200 ok`); app.listen(PORT,()=> console.log(`Server running ${PORT} `))})
mongoose.connection.on("error",(err)=>{console.log(err); logEvents(`${err.no}:${err.code}\t${err.syscall}\t${err.hostname}`,'mongoErrLog.log')})