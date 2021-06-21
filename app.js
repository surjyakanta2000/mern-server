require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

require("./startUp/db");
require("./startUp/routes")(app);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
