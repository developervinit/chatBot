const mongoose = require("mongoose");
const server = require("./socket_io/socket_io");
require("dotenv").config();


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

//server listening
server.listen(process.env.PORT || 3001, () =>
  console.log(`Server is listening on the port ${process.env.PORT}`)
);
