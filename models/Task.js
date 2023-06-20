const mongoose=require('mongoose')
const taskSchema = new mongoose.Schema({
    Project:{
        type:String,
        required:true
    },
    taskname: {
        type: String,
        required: true
    },
    reporter: {
        type: [String],
        required: true
    },
    assignee: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "To-Do"
    },
    duedate: {
        type: Date,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    summary: {
        type: String
    }
},{
    timestamps:true
})

module.exports=mongoose.model('Task',taskSchema)