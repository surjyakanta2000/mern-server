const express = require("express");
const studentRouter = express.Router();
const studentController = require("../Controllers/studentController");
const {
  validateAddStudent,
  validateUpdateStudent,
} = require("../Middleware/validateStudent");
const idValidate = require("../Middleware/validateID");

studentRouter.post("/add", validateAddStudent, studentController.addStudent);
studentRouter.get("/all", studentController.getStudent);
studentRouter.get("/:dept/:sem", studentController.getStudentForClass);
studentRouter.get("/:id", idValidate, studentController.specificStudent);
studentRouter.put(
  "/update/:id",
  idValidate,
  validateUpdateStudent,
  studentController.updateStudent
);
studentRouter.delete(
  "/delete/:id",
  idValidate,
  studentController.deleteStudent
);

module.exports = studentRouter;
