const mongoose = require("mongoose");
const noticeSchema = mongoose.Schema({
  noticeName: {
    type: String,
  },
  noticeFile: {
    type: String,
  },
  noticeDate: {
    type: String,
    default: new Date().toISOString().slice(0, 10),
  },
});

const Notice = mongoose.model("Notice", noticeSchema);
module.exports = Notice;
