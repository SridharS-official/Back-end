const express = require('express')
const router = express.Router()
const multer = require('multer');
const { getAllTasks, createTask, getTaskById, updateTaskById, deleteTaskById, deleteMultiple } = require('../controllers/taskController')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload')
    },
    filename: (req, file, cb) => {
        console.log(`file ${file}`)
        cb(null, Date.now() + ' -' + file.originalname)
    }
})
const upload = multer({ storage: storage })
router.get('/task-list', async (req, res) => {
    await getAllTasks(req, res)
})

router.post('/create-task', upload.fields([{ name: 'attachment', maxCount: 1 }]), async (req, res) => {
    await createTask(req, res)
})

router.get('/task-list/:id', async (req, res) => {
    await getTaskById(req, res)
})

router.put('/task-list/:id', async (req, res) => {
    await updateTaskById(req, res)
})

router.delete('/task-list', async (req, res) => {
    await deleteTaskById(req, res)
})

router.delete('/task-list-multiple', async (req, res) => {
    await deleteMultiple(req, res)
})



module.exports = router