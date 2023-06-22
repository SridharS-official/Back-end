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
 {
    name: {
        type:String,
        default: "Ajay"
    },
    role: { 
            type: String,
            default:"Software Associate"
        },
  },
  {
    name: {
        type:String,
        default: "Prem"
    },
     role: { 
            type: String,
            default:"HR"
        }
    },
  {timestamps:true})


module.exports=mongoose.model('ProjectEmp',employeeSchema)