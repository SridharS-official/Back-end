const mongoose = require('mongoose')
const employeeSchema=new mongoose.Schema({
    name: {
        type:String,
        default: "Deva"
    },
     role: { 
            type: String,
            default:"Software Associate"
        },
  },
  {timestamps:true})


module.exports=mongoose.model('ProjectEmp',employeeSchema)