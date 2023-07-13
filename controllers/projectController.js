const Projects = require('../models/Projects')
const ProjectEmp = require('../models/ProjectEmp')
const ProjectRecycle = require('../models/ProjectRecycle')
const mangoose = require('mongoose')
// const otpgenerator = require('otp-generator')

const getAllProjects = async (req, res) => {
    try {
        const project = await Projects.find({})
        res.status(200).json({ project })
    }
    catch (error) {
        res.status(404).json({ error })
    }
}

const getEmployee = async (req, res) => {
    try {
        const employee = await ProjectEmp.find({})
        res.status(200).json({ employee })
    }
    catch (error) {
        res.status(404).json({ error })
    }
}

const createEmployee = async (projectEmpData, res) => {
    try {
        const newProjectEmp = new ProjectEmp({
            ...projectEmpData
        })
        await newProjectEmp.save().then((data) => {
            res.status(200).json({ data })
        }).catch((error) => res.status(404).json({ error }))
    }
    catch (error) {
        res.status(404).json({ error })
    }
}


const createProject = async (projectData, res) => {
    try {
      const count = await Projects.countDocuments();
      let projectId;
      if (count >= 1) {
        const latestProject = await Projects.findOne({}).sort({ _id: -1 }).exec();
        const split = latestProject.projectId.split("-");
        const prevProject = parseInt(split[1]);
        const currentId = prevProject + 1;
        projectId = "Project-" + currentId;
      } else {
        projectId = "Project-1000";
      }
  
      const newProject = new Projects({
        ...projectData,
        projectId
      });
  
      await newProject.save();
      res.status(200).json({ data: newProject });
    } catch (error) {
      res.status(404).json({ error });
    }
  };
  


const getProjectById = async (req, res) => {
    const project = await Projects.findById(req.params.id).exec()
    if (!project) {
        res.status(404).json({ message: `no project is Available in this id: ${req.params.id}` })
    }
    try {
        await Projects.findOne({ _id: req.params.id }).then((data) => {
            res.status(200).json({ message: "Successfull", data })
        }).catch((error) => res.status(404).json({ error }))
    }
    catch (error) {
        res.status(404).json({ error })
    }
}


const deleteProjectsByIds = async (req, res) => {
    const projectIds = req.body.ids; 

    try {
      const projectsToDelete = await Projects.find({ _id: { $in: projectIds } });
  
      if (projectsToDelete.length === 0) {
        res.status(404).json({ message: `No projects found with the given IDs` });
        return;
      }
  
      const recycledProjects = projectsToDelete.map(async project => {
        const { _id, status, scrum, lead, powner, name, projectId, description,memb } = project;
        const newProjectRecycle = new ProjectRecycle({
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
        await newProjectRecycle.save();
      });
  
      await Projects.deleteMany({ _id: { $in: projectIds } });
  
      res.status(200).json({ message: `Successfully deleted ${projectsToDelete.length} projects` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  

const updateProjectById = async (req, res) => {
    const Project = await Projects.findById(req.params.id).exec()
    if (!Project) {
        res.status(404).json({ message: `no project is Available in this id: ${req.params.id}` })
    }
    try {
        await Projects.findByIdAndUpdate(req.params.id, { $set: req.body }).then((data) => {
            res.status(200).json({ message: `Successfully Updated ${req.params.id}` })
        }).catch((error) => res.status(404).json({ error }))
    }
    catch (error) {
        res.status(404).json({ error })
    }
}

module.exports = {
    getAllProjects,
    createProject,
    getProjectById,
    deleteProjectsByIds,
    updateProjectById,
    getEmployee,
    createEmployee
}