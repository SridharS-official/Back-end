const express=require('express')
const router=express.Router()
const {getAllProjects, createProject, getProjectById, updateProjectById, deleteProjectById, getEmployee, createEmployee }=require('../controllers/projectController')

router.get('/project',async(req,res)=>{
    await getAllProjects(req,res)
})

router.get('/employee',async(req,res)=>{
    await getEmployee(req,res)
})

router.post('/employee', async(req,res)=>{
    await createEmployee(req.body,res)
})

router.post('/project',async(req,res)=>{
    await createProject(req.body,res)
})

router.get('/project/:id',async(req,res)=>{
    await getProjectById(req,res)
})

router.delete('/project/:id',async(req,res)=>{
    await deleteProjectById(req,res)
})

router.put('/project/:id',async(req,res)=>{
    await updateProjectById(req,res)
})

module.exports=router