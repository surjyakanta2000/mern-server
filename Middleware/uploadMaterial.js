const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./uploads/materials/");
  },
  filename: function (req, file, cb) {
    cb(null, "material" + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  cb(null, true);
};
let upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload.single("material");
