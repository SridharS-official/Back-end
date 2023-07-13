const Task=require('../models/Task')
const mongoose=require('mongoose')
const fs = require('fs');


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
        const{Project,taskname,reporter,assignee,priority,duedate,description,summary,story,deliveryteam,type,sprint,targetrelease} = req.body;
        Task.count().then(async (doc)=>{
          if(doc>=1)
          {
            Task.findOne({}).sort({_id:-1}).exec().then( async function(data) {
              try{
                let split = data.taskId.split("-")
                const prevtask = parseInt(split[1])
               const currentid=prevtask+1;
               const taskId="Task-"+currentid
                const newTask=new Task({
                  Project,
                  taskname,
                  reporter,
                  assignee,
                  priority,
                  duedate,
                  description,
                  summary,
                  story,
                  deliveryteam,
                  type,
                  sprint,
                  targetrelease,
                  taskId,
                })
                await newTask.save().then((data)=>{
                  res.status(200).json(data)
                }).catch((err)=>res.status(404).json({err}))
              }
              catch(err){
                  res.status(500).json({err})
                }
            })
          }
          else{
            try{
             const taskId="Task-1000";
              const newTask=new Task({
                ...taskData,
                taskId
              })
              await newTask.save().then((data)=>{
                res.status(200).json(data)
              }).catch((err)=>res.status(404).json({err}))
            }
            catch(err){
                res.status(500).json({err})
              }
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
        await Task.findByIdAndUpdate(req.params.id,{images : urls}).then((data)=>{
            res.status(200).json({message:`successfully updated ${req.params.id}`})
        }).catch((error)=>res.status(404).json({error}))
    }
    catch(err){
        res.status(404).json({err})
    }
 }

 const deleteTaskById=async(req,res)=>{
    
    // const task=await Task.findById(req.params.id).exec()
    // if(!task){
    //     return  res.status(404).json({message:`no id is available ${req.params.id}`})
    // }
    const ids=req.body;
    try{
      await Task.deleteMany({ _id: { $in: ids } }).then((data)=>{
              res.status(200).json({messsge:`successfully deleted ${ids}`})
      }).catch((error)=>res.status(404).json({error}))
  }
    catch(error){
        res.status(404).json({error})
    }
}

const deleteMultiple=async(req,res)=>{
    const ids=req.body;
  try{
      await Task.deleteMany({ _id: { $in: ids } }).then((data)=>{
              res.status(200).json({messsge:`successfully deleted ${ids}`})
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
    deleteTaskById,
    deleteMultiple,
}