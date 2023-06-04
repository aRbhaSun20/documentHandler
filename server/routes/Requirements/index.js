const { Router } = require("express");
const projectRouter = require("./projects");

const requirementRouter = Router();

// project routes
requirementRouter.use("/rm", projectRouter);

module.exports = {requirementRouter}