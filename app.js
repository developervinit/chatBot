const express = require("express");

let app = express();
app.use(express.json()); //to handle post request.



module.exports = app;