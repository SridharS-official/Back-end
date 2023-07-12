const express=require('express')
const router=express.Router()
const {getAllTasks, createTask,getTaskById,updateTaskById,deleteTaskById, deleteMultiple}=require('../controllers/taskController')
const { upload } = require('../utils/multer')

const uploadmiddleware = upload.array("image")
router.get('/task-list',async(req,res)=>{
    await getAllTasks(req,res)
})

router.post('/create-task', uploadmiddleware ,async(req,res)=>{
    await createTask(req,res)
})

router.get('/task-list/:id',async(req,res)=>{
    await getTaskById(req,res)
})

router.put('/task-list/:id',async(req,res)=>{
    await updateTaskById(req,res)
})

router.delete('/task-list',async(req,res)=>{
    await deleteTaskById(req,res)
})

router.delete('/task-list-multiple',async(req,res)=>{
    await deleteMultiple(req,res)
})



module.exports=router