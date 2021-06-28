const fs = require("fs");

const validateNotice = async (req, res, next) => {
  if (typeof req.file === "undefined" || typeof req.body === "undefined") {
    return res.status(400).json({
      errors: "problem with sending file",
    });
  }
  let noticeFile = req.file.path;

  if (!req.file.mimetype.includes("pdf")) {
    fs.unlinkSync(noticeFile);
    return res.status(400).json({ errors: "file not supported" });
  }

  if (req.file.size > 1024 * 1024 * 4) {
    fs.unlinkSync(assignFile);
    return res.status(400).json({
      errors: "file is too large",
    });
  }

  next();
};

module.exports = { validateNotice };
