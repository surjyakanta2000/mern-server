const express = require("express");
const adminRouter = express.Router();
const adminController = require("../Controllers/adminController");
const {
  validateAddAdmin,
  validateUpdateAdmin,
} = require("../Middleware/validateAdmin");
const idValidate = require("../Middleware/validateID");

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

module.exports = adminRouter;
