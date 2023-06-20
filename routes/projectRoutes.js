const express=require('express')
const router=express.Router()
const {getAllProjects, createProject}=require('../controllers/projectController')

router.get('/projects',async(req,res)=>{
    await getAllProjects(req,res)
})

router.post('/create',async(req,res)=>{
    await createProject(req,res)
})

module.exports=router