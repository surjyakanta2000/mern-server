const express = require("express");
const authRouter = express.Router();
const authController = require("../Controllers/authController");

authRouter.post("/login", authController.userLogin);

authRouter.post("/usercheck", authController.userCheck);
authRouter.post("/anscheck", authController.ansCheck);
authRouter.patch("/resetpassword/:id", authController.resetPassword);

module.exports = authRouter;
