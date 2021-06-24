const fs = require("fs");

const validateProfilePic = async (req, res, next) => {
  if (typeof req.file === "undefined" || typeof req.body === "undefined") {
    return res.status(400).json({
      errors: "problem with sending file",
    });
  }
  let profilePic = req.file.path;

  if (
    !req.file.mimetype.includes("jpeg") &&
    !req.file.mimetype.includes("jpg") &&
    !req.file.mimetype.includes("png")
  ) {
    fs.unlinkSync(profilePic);
    return res.status(400).json({ errors: "file not supported" });
  }

  if (req.file.size > 1024 * 1024 * 3) {
    fs.unlinkSync(assignFile);
    return res.status(400).json({
      errors: "file is too large",
    });
  }

  next();
};

module.exports = { validateProfilePic };
