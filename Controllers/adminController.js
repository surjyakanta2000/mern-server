const Admin = require("../Model/adminModel");

exports.addAdmin = async (req, res) => {
  const { adminName, adminEmail, adminPhone, adminPassword } = req.body;
  await Admin.create({
    adminName,
    adminEmail,
    adminPhone,
    adminPassword,
  });
  res.status(200).send("Admin Created..");
};
exports.getAdmin = async (req, res) => {
  const allAdmin = await Admin.find({}).select("-adminPassword");
  return res.status(200).json(allAdmin);
};
exports.specificAdmin = async (req, res) => {
  const specificAdminData = await Admin.findById(req.params.id).select(
    "-adminPassword"
  );
  if (!specificAdminData) return res.status(404).send("no data found.");
  res.status(200).send(specificAdminData);
};
exports.updateAdmin = async (req, res) => {
  await Admin.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).send("admin updated..");
};
exports.deleteAdmin = async (req, res) => {
  const admins = await Admin.find({});
  if (admins.length < 2)
    return res.status(400).send("Super Admin may not be Empty..");
  await Admin.findByIdAndDelete(req.params.id);
  res.status(200).send("Admin removed..");
};
