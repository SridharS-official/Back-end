const express=require('express')
const router=express.Router()
const {getAllProjects, createProject, getProjectById, updateProjectById, deleteProjectById, getEmployee, createEmployee }=require('../controllers/projectController')

router.get('/projectLists',async(req,res)=>{
    await getAllProjects(req,res)
})

router.get('/employee',async(req,res)=>{
    await getEmployee(req,res)
})

router.post('./createEmp', async(req,res)=>{
    await createEmployee(req,res)
})

router.post('/createProject',async(req,res)=>{
    await createProject(req.body,res)
})

router.get('/getProjectId/:id',async(req,res)=>{
    await getProjectById(req,res)
})

router.delete('/deleteProject/:id',async(req,res)=>{
    await deleteProjectById(req,res)
})

router.put('/updateProject/:id',async(req,res)=>{
    await updateProjectById(req,res)
})

module.exports=router