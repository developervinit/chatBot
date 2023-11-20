const app = require("./app");
const http = require("http");
const path = require("node:path");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const axios = require("axios");
const server = require("./socket_io/socket_io");
require("dotenv").config();


let join = path.join;

//start-code to connect mongodb
async function connectingMongoose(dbString) {
  try {
    await mongoose.connect(dbString);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

const db = mongoose.connection;
db.on("connected", () => {
  console.log("Connected to MongoDB Successfully");
});
db.on("error", (err) => {
  console.error(`Error connecting to mongoDB ${err}`);
});

let dbString = process.env.CONNECTIONSTRING.replace(
  "password",
  process.env.PASSWORD
);
connectingMongoose(dbString);
//end-code to connect mongodb


server.listen(process.env.PORT || 3001, () =>
  console.log(`Server is listening on the port ${process.env.PORT}`)
);
