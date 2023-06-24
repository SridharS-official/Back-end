const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');

// const connection = mongoose.createConnection(process.env.MONGO_URL);
// autoIncrement.initialize(connection);

const taskSchema = new mongoose.Schema(
  {
    // taskId: {
    //   type: String,
    //   unique: true,
    // },
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
      default: 'To-Do',
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
  },
  {
    timestamps: true,
  }
);

// taskSchema.plugin(autoIncrement.plugin, {
//   model: 'Task',
//   field: 'taskId',
//   startAt: 1001,
//   incrementBy: 1,
// });

module.exports = mongoose.model('Task', taskSchema);
