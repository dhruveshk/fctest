const express = require('express');
const helper = require("./src/lib/helper");
const config = require('./config/config');
const app = express();
const port = config.server.port;

// Parsing body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Register routes
helper
    .fileList('./src/routes')
    .forEach(filePath => require(`./${filePath.toString()}`)(app));

// Start the server
if(process.env.NODE_ENV != "test") {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = {
  app: app
}