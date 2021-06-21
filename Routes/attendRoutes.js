const express = require("express");
const attendRouter = express.Router();
const attendController = require("../Controllers/attendController");

attendRouter.post("/add", attendController.addAttend);
attendRouter.get("/student/:id", attendController.getAttend);

module.exports = attendRouter;
