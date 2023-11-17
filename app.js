const express = require("express");
const openAiRoute = require("./routes/openAiRoute");
const historyDataRoute = require('./routes/historyDataRoute');

let app = express();
app.use(express.json()); //to handle post request.

//mounting the routes.
app.use('/openai', openAiRoute);
app.use('/history', historyDataRoute);


module.exports = app;