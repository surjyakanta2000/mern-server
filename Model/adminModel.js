const mongoose = require("mongoose");
const adminSchema = mongoose.Schema({
  adminName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  adminEmail: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  adminPhone: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  adminPassword: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "admin",
  },
});
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
