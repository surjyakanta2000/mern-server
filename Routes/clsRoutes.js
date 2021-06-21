const express = require("express");
const clsRouter = express.Router();
const clsController = require("../Controllers/clsController");
const {
  validateAddClass,
  validateUpdateClass,
} = require("../Middleware/validateClass");
const idValidate = require("../Middleware/validateID");

clsRouter.post("/add", validateAddClass, clsController.addClass);
clsRouter.get("/teacher/:id", idValidate, clsController.getClsForTeacher);
clsRouter.get("/dept/:id", idValidate, clsController.getClsForDept);
clsRouter.get("/:deptId/:sem", clsController.getClsForStudent);
// clsRouter.get("/all", adminController.getAdmin);
clsRouter.get("/:id", idValidate, clsController.specificClass);
clsRouter.put("/update/:id", validateUpdateClass, clsController.updateClass);
clsRouter.delete("/delete/:id", idValidate, clsController.deleteClass);

module.exports = clsRouter;
