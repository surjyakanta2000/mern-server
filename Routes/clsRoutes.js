const express = require("express");
const clsRouter = express.Router();
const clsController = require("../Controllers/clsController");
const uploadMaterial = require("../Middleware/uploadMaterial");
const {
  validateAddClass,
  validateUpdateClass,
} = require("../Middleware/validateClass");
const idValidate = require("../Middleware/validateID");

clsRouter.post("/add", validateAddClass, clsController.addClass);
clsRouter.get("/teacher/:id", idValidate, clsController.getClsForTeacher);
clsRouter.get("/dept/:id", idValidate, clsController.getClsForDept);
clsRouter.get("/:deptId/:sem", clsController.getClsForStudent);
clsRouter.get("/:id", idValidate, clsController.specificClass);
clsRouter.put("/update/:id", validateUpdateClass, clsController.updateClass);
clsRouter.delete("/delete/:id", idValidate, clsController.deleteClass);

clsRouter.post("/material/add", uploadMaterial, clsController.addMaterial);
clsRouter.delete(
  "/material/delete/:clsCode/:materialId",

  clsController.deleteMaterial
);

module.exports = clsRouter;
