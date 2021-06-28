const express = require("express");
const studentRouter = express.Router();
const studentController = require("../Controllers/studentController");
const {
  validateAddStudent,
  validateUpdateStudent,
} = require("../Middleware/validateStudent");
const uploadProfilePic = require("../Middleware/uploadProfilePic");
const idValidate = require("../Middleware/validateID");
const { validateProfilePic } = require("../Middleware/validateProfilePic");

studentRouter.post("/add", validateAddStudent, studentController.addStudent);
studentRouter.get("/specstudent/:id", studentController.getStudentByRoll);

studentRouter.get("/all", studentController.getStudent);
studentRouter.get("/:dept/:sem", studentController.getStudentForClass);
studentRouter.get("/:id", idValidate, studentController.specificStudent);
studentRouter.put(
  "/update/:id",
  idValidate,
  validateUpdateStudent,
  studentController.updateStudent
);

studentRouter.put(
  "/profile/update/:id",
  uploadProfilePic,
  validateProfilePic,
  studentController.updateProfile
);

studentRouter.delete(
  "/delete/:id",
  idValidate,
  studentController.deleteStudent
);

module.exports = studentRouter;
