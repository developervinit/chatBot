const express = require("express");
const openAiRoute = require("./routes/openAiRoute");
const historyDataRoute = require('./routes/historyDataRoute');

let app = express();
app.use(express.json()); //to handle post request.

//to attach the static file. index.html file in public folder runs on "/" directory.
app.use(express.static("public")); 

//mounting the routes.
app.use('/openai', openAiRoute);
app.use('/history', historyDataRoute);

app.all("*", (req, res) => {
    res.send("Opps this route is not defined");
})


module.exports = app;