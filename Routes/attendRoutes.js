const express = require("express");
const attendRouter = express.Router();
const attendController = require("../Controllers/attendController");
const validateId = require("../Middleware/validateID");

attendRouter.post("/add", attendController.addAttend);
attendRouter.get("/student/:id", validateId, attendController.getAttend);
attendRouter.get("/all/:id", validateId, attendController.getAttendForDept);

module.exports = attendRouter;
