const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');

// const connection = mongoose.createConnection(process.env.MONGO_URL);
// autoIncrement.initialize(connection);

const taskSchema = new mongoose.Schema(
  {
    taskId: {
      type: String,
      required: false,
    },
    Project: {
      type: String,
      required: false,
    },
    taskname: {
      type: String,
      required: false,
    },
    reporter: {
      type: [String],
      required: false,
    },
    assignee: {
      type: String,
      required: false,
    },
    priority: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      default: 'icebox',
    },
    duedate: {
      type: Date,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    summary: {
      type: String,
    },
    story:{
      type : String
    },
    deliveryteam:
    {
      type : [String]

    },
    sprint : {
      type: String
    },
    targetrelease: {
      type: String
    },
   type: {
    type:String,
    required:false
    },
    comment:{
      type : [String]
    },
    attachment:{
      data:Buffer,
      contentType:String
    },
    worklog:[ {
     name:{
      type:String,
    } ,
    startTime:{
      type:String,
    },
    endTime:{
      type:String,
    },
    workingHour:{
      type:String,
    },
    date:{
      type:String,
    },
    details:{
      type:String,
    }
  }],
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model('Task', taskSchema);
