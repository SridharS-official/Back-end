const mongoose=require('mongoose')
const connectDB=async()=>{
try{
    await mongoose.connect(process.env.MONGO_URL,{
   // await mongoose.connect('mongodb+srv://Sridhar9422:Sri9422@cluster0.qnmhlxb.mongodb.net/?retryWrites=true&w=majority',{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
}
catch(error){
    console.log('error')
}
}
module.exports=connectDB