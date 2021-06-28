const express = require("express");
const adminRouter = express.Router();
const adminController = require("../Controllers/adminController");
const {
  validateAddAdmin,
  validateUpdateAdmin,
} = require("../Middleware/validateAdmin");
const idValidate = require("../Middleware/validateID");
const uploadNotice = require("../Middleware/uploadNotice");
const { validateNotice } = require("../Middleware/validateNotice");

adminRouter.post("/add", validateAddAdmin, adminController.addAdmin);
adminRouter.get("/all", adminController.getAdmin);
adminRouter.get("/:id", idValidate, adminController.specificAdmin);
adminRouter.put(
  "/update/:id",
  idValidate,
  validateUpdateAdmin,
  adminController.updateAdmin
);
adminRouter.delete("/delete/:id", idValidate, adminController.deleteAdmin);

adminRouter.post(
  "/notice/add",
  uploadNotice,
  validateNotice,
  adminController.addNotice
);
adminRouter.get("/notice/all", adminController.getNotice);
adminRouter.delete(
  "/notice/delete/:id",
  idValidate,
  adminController.deleteNotice
);

module.exports = adminRouter;
