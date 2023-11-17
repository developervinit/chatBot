const express = require("express");
const openAiRoute = require("./routes/openAiRoute");


let app = express();
app.use(express.json()); //to handle post request.

//mounting the routes.
app.use('/openai', openAiRoute);


module.exports = app;