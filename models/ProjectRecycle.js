const mongoose = require('mongoose')
const projectRecycleSchema = new mongoose.Schema({
        _id:{
            type:String,
        },
        projectId:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        powner:{
            type:String,
            required:true
        },
        lead:{
            type:String,
            required:true
        },
        scrum:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        },
        memb:{
            type:[String],
            required:true,
                },
        description:{
            type:String
        }
        // createdAt:{
        //     type:Number,
        // },
        // updatedAt:{
        //     type:Number,
        // },
        // __v:{
        //     type:Number
        // }

},{timestamps:true})

module.exports=mongoose.model('ProjectRecycle',projectRecycleSchema)