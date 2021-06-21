const express = require("express");
const authRouter = express.Router();
const authController = require("../Controllers/authController");
// const {
//   validateAddTeach,
//   validateUpdateTeach,
// } = require("../Middleware/validateTeacher");
// const idValidate = require("../Middleware/validateID");

authRouter.post("/login", authController.userLogin);
// authRouter.get("/all", authController.getTeacher);

module.exports = authRouter;
