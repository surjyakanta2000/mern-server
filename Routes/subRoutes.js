const express = require("express");
const subRouter = express.Router();
const {
  validateAddSub,
  validateUpdateSub,
} = require("../Middleware/validateSub");
const joiValidate = require("../Middleware/validateID");
const subController = require("../Controllers/subController");

subRouter.post("/add", validateAddSub, subController.addSubject);
subRouter.get("/all", subController.allSubject);
subRouter.get("/:id", joiValidate, subController.specSubject);
subRouter.get("/dept/:id", joiValidate, subController.getSubForDept);
subRouter.delete("/delete/:id", joiValidate, subController.deleteSubject);
subRouter.put(
  "/update/:id",
  joiValidate,
  validateUpdateSub,
  subController.updateSubject
);

module.exports = subRouter;
