require("dotenv").config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connectDB = require('./config/dbConn');
const userRouter=require('./routes/userRoutes')
const projectRouter=require('./routes/projectRoutes')
const PORT=process.env.PORT||8080
//const PORT=5000
const cors=require('cors')
const logger=require('morgan')


app.use(express.json())//parsing 
app.use(cors())//to handle wrong port number
app.use(logger('dev'))
connectDB();
app.use('/api',userRouter)
app.use('/server',projectRouter)
// always last



mongoose.connection.once("open",()=>{ console.log(`Mongoo is connected 200 ok`); app.listen(PORT,()=> console.log(`Server running ${PORT} `))})
mongoose.connection.on("error",(err)=>{console.log(err); logEvents(`${err.no}:${err.code}\t${err.syscall}\t${err.hostname}`,'mongoErrLog.log')})