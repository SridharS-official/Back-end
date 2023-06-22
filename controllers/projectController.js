const Projects=require('../models/Projects')
const Employee=require('../models/ProjectEmp')
const mangoose=require('mongoose')

const getAllProjects=async(req,res)=>{
    try{
        const project=await Projects.find({})
        res.status(200).json({project})
    }
    catch(error){
        res.status(404).json({error})
    }
}

const getEmployee=async(req,res)=>{
    try{
        const employee=await Employee.find({})
        res.status(200).json({employee})
    }
    catch(error){
        res.status(404).json({error})
    }
}

const createProject=async(projectData,res)=>{
    try{
        const newProject = new Projects({
            ...projectData
        })
        await newProject.save().then((data)=>{
            res.status(200).json({data})
        }).catch((error)=>res.status(404).json({error}))
    }
    catch(error){
        res.status(404).json({error})
    }
}

const getProjectById=async(req,res)=>{
    const project=await Projects.findById(req.params.id).exec()
    if(!project){
        res.status(404).json({message:`no project is Available in this id: ${req.params.id}`})
    }
    try{
        await Projects.findOne({_id:req.params.id}).then((data)=>{
            res.status(200).json({message:"Successfull",data})
        }).catch((error)=>res.status(404).json({error}))
    }
    catch(error){
        res.status(404).json({error})
    }
}

const deleteProjectById=async(req,res)=>{
    const project=await Projects.findById(req.params.id).exec()
    if(!project){
        res.status(404).json({message:`no project is Available in this id: ${req.params.id}`})
    }
    try{
        await Projects.deleteOne({_id:req.params.id}).then((data)=>{
            res.status(200).json({message:`Successfull deleted ${req.params.id}`})
        }).catch((error)=>res.status(404).json({error}))
    }
    catch(error){
        res.status(404).json({error})
    }
}

const updateProjectById=async(req,res)=>{
    const Project=await Projects.findById(req.params.id).exec()
    if(!Project){
        res.status(404).json({message:`no project is Available in this id: ${req.params.id}`})
    }
    try{
        await Projects.findByIdAndUpdate(req.params.id,{$set:req.body}).then((data)=>{
            res.status(200).json({message:`Successfully Updated ${req.params.id}`})
        }).catch((error)=>res.status(404).json({error}))
    }
    catch(error){
        res.status(404).json({error})
    }
}

module.exports={
    getAllProjects,
    createProject,
    getProjectById,
    deleteProjectById,
    updateProjectById,
    getEmployee
}