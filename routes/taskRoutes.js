const express=require('express')
const router=express.Router()
const {getAllTasks, createTask,getTaskById,updateTaskById,deleteTaskById, deleteMultiple, savePdf}=require('../controllers/taskController')
const multer = require('multer');

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'upload')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + ' -' + file.originalname)
    }
  })
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true)
    }
    else {
      cb(new Error('Only PDF, JPEG, and PNG files are allowed'))
    }
  }

  const upload = multer({ storage: storage, fileFilter: fileFilter })

router.get('/task-list',async(req,res)=>{
    await getAllTasks(req,res)
})

router.post('/create-task', upload.fields([{ name: 'attachment'}]),async(req,res)=>{
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

router.put('/task-list-attach/:id',async(req,res)=>{
    await savePdf(req,res)
})


module.exports=router