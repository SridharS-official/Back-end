const express = require('express');
const router = express.Router();
const {
    getAllRecycledProjects,
    restoreProjectsByIds,
    deleteProjectsFromRecycleBin,
} = require('../controllers/projectRecycleController');

router.get('/recycleProjects', async (req, res) => {
  await getAllRecycledProjects(req, res);
});

router.put('/recycleProjects/restore', async (req, res) => {
  await restoreProjectsByIds(req, res);
});

router.delete('/recycleProjects/delete', async (req, res) => {
  await deleteProjectsFromRecycleBin(req, res);
});

module.exports = router;
