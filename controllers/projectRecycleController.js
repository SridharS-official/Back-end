const ProjectRecycle = require('../models/ProjectRecycle');
const Projects = require('../models/Projects')

const getAllRecycledProjects = async (req, res) => {
  try {
    const recycledProjects = await ProjectRecycle.find({});
    res.status(200).json({ recycledProjects });
  } catch (error) {
    res.status(404).json({ error });
  }
};

const restoreProjectsByIds = async (req, res) => {
  const projectIds = req.body.ids; // Array of project IDs to be restored

  try {
    const projectsToRestore = await ProjectRecycle.find({ _id: { $in: projectIds } });
    if (projectsToRestore.length === 0) {
      res.status(404).json({ message: `No projects found in the Recycle Bin with the given IDs` });
      return;
    }

    // Move restored projects back to the Projects collection
    // await Promise.all(
    //   projectsToRestore.map(async (project) => {
    //     //await project.remove();
    //     await project.save();
    //   })
    // );

    const restoredProjects = projectsToRestore.map(async project => {
        const { _id, status, scrum, lead, powner, name,memb, projectId, description } = project;
        const newProjects = new Projects({
          _id,
          status,
          scrum,
          lead,
          powner,
          name,
          memb,
          projectId,
          description
        });
        await newProjects.save();
      });
  
      await ProjectRecycle.deleteMany({ _id: { $in: projectIds } });

    res.status(200).json({ message: `Successfully restored ${projectsToRestore.length} projects` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProjectsFromRecycleBin = async (req, res) => {
  const projectIds = req.body.ids; // Array of project IDs to be permanently deleted

  try {
    const deleteResult = await ProjectRecycle.deleteMany({ _id: { $in: projectIds } });

    if (deleteResult.deletedCount === 0) {
      res.status(404).json({ message: `No projects found in the Recycle Bin with the given IDs` });
    } else {
      res.status(200).json({ message: `Successfully permanently deleted ${deleteResult.deletedCount} projects` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllRecycledProjects,
  restoreProjectsByIds,
  deleteProjectsFromRecycleBin,
};
