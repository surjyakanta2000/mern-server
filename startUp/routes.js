const express = require("express");
const cors = require("cors");
const deptRouter = require("../Routes/deptRoutes");
const techRouter = require("../Routes/teachRoutes");
const subRouter = require("../Routes/subRoutes");
const studentRouter = require("../Routes/studentRoutes");
const classRouter = require("../Routes/clsRoutes");
const assignRouter = require("../Routes/assignRoutes");
const attendRouter = require("../Routes/attendRoutes");
const adminRouter = require("../Routes/adminRoutes");
const authRouter = require("../Routes/authRoutes");
const homeRouter = require("../Routes/homeRoutes");

module.exports = function (app) {
  app.use(express.json());
  app.use(cors());

  // app.use(function (req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-Type, Accept"
  //   );
  //   res.header('Access-Control-Allow-Methods','GET,PUT,PATCH,DELETE,OPTIONS')
  //   next();
  // });
  app.use("/", homeRouter);
  app.use("/api/dept", deptRouter);
  app.use("/api/tech", techRouter);
  app.use("/api/sub", subRouter);
  app.use("/api/student", studentRouter);
  app.use("/api/class", classRouter);
  app.use("/api/assignment", assignRouter);
  app.use("/api/attend", attendRouter);
  app.use("/api/admin", adminRouter);
  app.use("/api/auth", authRouter);
};
