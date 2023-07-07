const express=require('express')
const router=express.Router()
const {getAllTasks, createTask,getTaskById,updateTaskById,deleteTaskById, deleteMultiple, savePdf}=require('../controllers/taskController')
const multer = require('multer');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Get the current date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().replace(/:/g, '-');

    // Generate a new filename with the current date and time
    const fileName = formattedDate + '-' + file.originalname;

    cb(null, fileName);
  }
});
const upload = multer({ storage: storage });


router.get('/task-list',async(req,res)=>{
    await getAllTasks(req,res)
})

router.post('/create-task',async(req,res)=>{
    await createTask(req,res)
})

router.get('/task-list/:id',async(req,res)=>{
    await getTaskById(req,res)
})

router.put('/task-list/:id',async(req,res)=>{
    await updateTaskById(req,res)
})

router.delete('/task-list/:id',async(req,res)=>{
    await deleteTaskById(req,res)
})

router.delete('/task-list-multiple',async(req,res)=>{
    await deleteMultiple(req,res)
})

router.put('/task-list-attach/:id',async(req,res)=>{
    await savePdf(req,res)
})


module.exports=router