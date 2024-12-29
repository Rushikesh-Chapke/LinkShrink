const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

require('./src/routers')(app);

app.listen(process.env.PORT_NO, () => {
  console.log(`Server is running on port no:${process.env.PORT_NO}`);
});

module.exports = {
  app,
};
