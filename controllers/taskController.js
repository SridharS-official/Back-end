const Task=require('../models/Task')
const mongoose=require('mongoose')


const getAllTasks=async(req,res)=>{
    try {
      const tasks=await Task.find({})
      res.status(200).json(tasks)
    } catch (error) {
     console.log(error)
     res.status(400).json({error})
    }
}

const createTask=async(taskData,res)=>{
    try{
      const newTask=new Task({
        ...taskData
      })
      await newTask.save().then((data)=>{
        res.status(200).json(data)
      }).catch((err)=>res.status(404).json({err}))
    }
    catch(err){
        res.status(500).json({err})
      }
}


const getTaskById=async(req,res)=>{
    const task=await Task.findById(req.params.id).exec()
    if(!task){
        return res.status(404).json({message:`no user is available ${req.params.id}`})
    }
    try{
        await Task.findOne({_id:req.params.id}).then((data)=>{
                res.status(200).json({message:"successful",data})
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

module.exports={
    getAllTasks,
    createTask,
    getTaskById,
    updateTaskById,
    deleteTaskById
}