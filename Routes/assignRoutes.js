const express = require("express");
const assignRouter = express.Router();
const assignController = require("../Controllers/assignController");
const uploadAssign = require("../Middleware/uploadAssign");
const { validateAssign } = require("../Middleware/validateAssign");
const validateId = require("../Middleware/validateID");

assignRouter.post(
  "/add",
  uploadAssign,
  validateAssign,
  assignController.addAssignment
);
assignRouter.post("/response", uploadAssign, assignController.addStudentRes);
assignRouter.get("/responses/:id", assignController.getResponses);
assignRouter.get("/:id", validateId, assignController.getAssignment);
assignRouter.delete(
  "/delete/:id",
  validateId,
  assignController.deleteAssignment
);

module.exports = assignRouter;
