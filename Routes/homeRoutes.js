const express = require("express");
const clsRouter = express.Router();
const path = require("path");

clsRouter.get("/uploads", (req, res) => {
  res.send("welcome to upload folder");
});

clsRouter.get("/uploads/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const absolutePath = path.join(__dirname, "../uploads/");
  res.sendFile(`${absolutePath}${fileName}`);
});

clsRouter.get("/uploads/photos/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const absolutePath = path.join(__dirname, "../uploads/photos/");
  res.sendFile(`${absolutePath}${fileName}`);
});

module.exports = clsRouter;
