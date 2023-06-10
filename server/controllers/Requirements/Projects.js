const Projects = require("../../models/Requirements/Projects");
const { errorlog, successlog } = require("../../utils/loggers");

const createProject = async (req, res) => {
  try {
    const { name } = req.body;
    const findProject = await Projects.findOne({ name });
    if (!findProject) {
      const userData = req.userData;
      const project = await new Projects({
        ...req.body,
        createdBy: userData._id,
        userAccess: [
          {
            roles: ["Administrator"],
            userId: userData._id,
          },
        ],
      }).save();
      successlog.info(
        `${project._id} project is created by ${userData._id} successfully`
      );
      res.status(201).json({
        name: project.name,
        _id: project._id,
      });
    } else {
      errorlog.error(`project ${name} alread exist`);
      res.status(400).json({
        error: "project alread exist",
      });
    }
  } catch (e) {
    errorlog.error(e);
  }
};

const updateProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const findProject = await Projects.findOne({ _id: projectId });
    if (findProject) {
      await Projects.updateOne({ _id: projectId }, { $set: req.body });
      successlog.info(
        `${findProject._id} updated by ${req.userData._id} successfully`
      );
      res.status(204).json({
        message: `${findProject._id} updated by ${req.userData._id} successfully`,
      });
    } else {
      errorlog.error("project doesn't exist");
      res.status(404).json({
        error: "project doesn't exist",
      });
    }
  } catch (e) {
    errorlog.error(e);
    res.send(400);
  }
};

const deleteProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const findProject = await Projects.findOne({ _id: projectId });
    if (findProject) {
      await Projects.deleteOne({ _id: projectId });
      successlog.info(
        `${findProject._id} deleted by ${req.userData._id} successfully`
      );
      res.status(204).json({
        message: `${findProject._id} deleted by ${req.userData._id} successfully`,
      });
    } else {
      errorlog.error("project doesn't exist");
      res.status(404).json({
        error: "project doesn't exist",
      });
    }
  } catch (e) {
    errorlog.error(e);
    res.send(400);
  }
};

const getAllProjects = async (req, res) => {
  try {
    const userData = req.userData;
    const findProject = await Projects.find({
      "userAccess.userId": userData._id,
    });
    if (findProject) {
      successlog.info(`All projects found for ${userData._id} successfully`);
      res.status(200).json(findProject);
    } else {
      errorlog.error(`user ${userData._id} doesn't have any projects`);
      res.status(404).json({
        error: "no projects allocated",
      });
    }
  } catch (e) {
    errorlog.error(e);
    res.send(400);
  }
};

const getProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const findProject = await Projects.findOne({ _id: projectId });
    if (findProject) {
      successlog.info(
        `${findProject._id} retrieved by ${req.userData._id} successfully`
      );
      res.status(200).json(findProject);
    } else {
      errorlog.error("project doesn't exist");
      res.status(404).json({
        error: "project doesn't exist",
      });
    }
  } catch (e) {
    errorlog.error(e);
    res.send(400);
  }
};

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getProject,
};
