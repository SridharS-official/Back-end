const mongoose = require('mongoose')
const projectSchema = new mongoose.Schema({
        projectName:{
            type:String,
            required:true
        },
        projectOwner:{
            type:String,
            required:true
        },
        teamLead:{
            type:String,
            required:true
        },
        scrumMaster:{
            type:String,
            required:true
        },
        projectStatus:{
            type:String,
            required:true
        },
        teamMemeber:{
            type:[String]
        },
        projectDescription:{
            type:String
        }

},{timestamps:true})
module.exports=mongoose.model('Projects',projectSchema)