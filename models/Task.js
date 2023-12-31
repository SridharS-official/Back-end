const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');

// const connection = mongoose.createConnection(process.env.MONGO_URL);
// autoIncrement.initialize(connection);

const taskSchema = new mongoose.Schema(
  {
    taskId: {
      type: String,
      required: true,
    },
    Project: {
      type: String,
      required: true,
    },
    taskname: {
      type: String,
      required: true,
    },
    reporter: {
      type: [String],
      required: true,
    },
    assignee: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'icebox',
    },
    duedate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
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
    required:true
    },
    comment:[{
      comment : {
        type: String
      },
      time: {
      type: Date
      }

    }],
    images:[
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
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
   }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);
