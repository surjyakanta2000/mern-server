require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DEV_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connect to database..");
  })
  .catch((err) => {
    console.log(err);
  });
