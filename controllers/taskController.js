const Task=require('../models/Task')
const mongoose=require('mongoose')
const otpgenerator =require('otp-generator')


const getAllTasks=async(req,res)=>{
    try {
      const tasks=await Task.find({})
      res.status(200).json(tasks)
    } catch (error) {
     console.log(error)
     res.status(400).json({error})
    }
}

const createTask=async(req,res)=>{
        let taskData = req.body;
       Task.countDocuments({}).then(async (taskId) => {
          taskId=1000+taskId;
          try{
            const newTask=new Task({
              ...taskData,
              taskId
            })
            if (req.files) {
              newTask.pdf = {
                data: req.files.file.data,
                contentType: req.files.file.mimetype,
              };
            }
            await newTask.save().then((data)=>{
              res.status(200).json(data)
            }).catch((err)=>res.status(404).json({err}))
          }
          catch(err){
              res.status(500).json({err})
            }
        })
  
}



const getTaskById=async(req,res)=>{
    const task=await Task.findById(req.params.id).exec()
    if(!task){
        return res.status(404).json({message:`no user is available ${req.params.id}`})
    }
    try{
        await Task.findOne({_id:req.params.id}).then((data)=>{
                res.status(200).json([data])
        }).catch((err)=>res.status(404).json({err}))
    }
    catch(error){
        res.status(404).json({error})
    }
}

const updateTaskById=async(req,res)=>{
    const task=await Task.findById(req.params.id).exec()
    if(!task){
        return  res.status(404).json({message:`no id is available ${req.params.id}`})
    }
    try{
        await Task.findByIdAndUpdate(req.params.id,{$set:req.body}).then((data)=>{
            res.status(200).json({message:`successfully updated ${req.params.id}`})
        }).catch((error)=>res.status(404).json({error}))
    }
    catch(err){
        res.status(404).json({err})
    }
 }

 const deleteTaskById=async(req,res)=>{
    
    const task=await Task.findById(req.params.id).exec()
    if(!task){
        return  res.status(404).json({message:`no id is available ${req.params.id}`})
    }
    try{
        await Task.deleteOne({_id:req.params.id}).then((data)=>{
                res.status(200).json({messsge:`successfully deleted ${req.params.id}`})
        }).catch((error)=>res.status(404).json({error}))
    }
    catch(error){
        res.status(404).json({error})
    }
}

const deleteMultiple=async(req,res)=>{
    const ids=req.body.array;
  try{
      await Task.deleteMany({ _id: { $in: ids } }).then((data)=>{
              res.status(200).json({messsge:`successfully deleted ${ids}`})
      }).catch((error)=>res.status(404).json({error}))
  }
  catch(error){
      res.status(404).json({error})
  }
}


const savePdf = async (req, res) => {
    const taskId = req.params.id;
    console.log(req.files)
    try {
      // Find the task document by taskId
      const task = await Task.findOne({ _id:taskId });
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      if (!req.files) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      
      const { buffer, mimetype } = req.files;
      task.pdf = {
        data: req.files.file.data,
        contentType: req.files.file.mimetype,
      };
      
      console.log(task.pdf)
      await task.save();
      
      return res.status(200).json({ message: 'PDF saved successfully' });
    } catch (error) {
      console.error('Error saving PDF:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports={
    getAllTasks,
    createTask,
    getTaskById,
    updateTaskById,
    deleteTaskById,
    deleteMultiple,
    savePdf
}