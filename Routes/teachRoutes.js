const express = require("express");
const techRouter = express.Router();
const techController = require("../Controllers/techController");
const {
  validateAddTeach,
  validateUpdateTeach,
} = require("../Middleware/validateTeacher");
const idValidate = require("../Middleware/validateID");

techRouter.post("/add", validateAddTeach, techController.addTeacher);
techRouter.get("/all", techController.getTeacher);
techRouter.get("/:id", idValidate, techController.specificTeacher);
techRouter.put(
  "/update/:id",
  idValidate,
  validateUpdateTeach,
  techController.updateTeacher
);
techRouter.delete("/delete/:id", idValidate, techController.deleteTeacher);

module.exports = techRouter;
