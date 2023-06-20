const Projects=require('../models/Projects')
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

const createProject=async(projectData,res)=>{
    try{
        const newProject = new Projects({
            ...projectData
        })
        await newProject.save().then((data)=>{
            res.status(400).json({data})
        }).catch((error)=>res.status(404).json({error}))
    }
    catch(error){
        res.status(404).json({error})
    }
}




module.exports={
    getAllProjects,
    createProject
}