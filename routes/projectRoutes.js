const express=require('express')
const router=express.Router()
const {getAllProjects, createProject, getProjectById, updateProjectById}=require('../controllers/projectController')
const { deleteById } = require('../controllers/userController')

router.get('/projects',async(req,res)=>{
    await getAllProjects(req,res)
})

router.post('/create',async(req,res)=>{
    await createProject(req.body,res)
})

router.get('/getProjectId',async(req,res)=>{
    await getProjectById(req,res)
})

router.delete('/delete',async(req,res)=>{
    await deleteById(req,res)
})

router.put('/updateProject',async(req,res)=>{
    await updateProjectById(req,res)
})

module.exports=router