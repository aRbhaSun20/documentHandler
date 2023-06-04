const { Router } = require("express");
const {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../../controllers/Requirements/Projects");

const projectRouter = Router();

// GET Request
projectRouter.get("/project", getAllProjects);
projectRouter.get("/project/:projectId", getProject);

// POST Request
projectRouter.post("/project", createProject);

// PUT Request
projectRouter.put("/project/:projectId", updateProject);

// DELETE Request
projectRouter.delete("/project/:projectId", deleteProject);

module.exports = projectRouter;
