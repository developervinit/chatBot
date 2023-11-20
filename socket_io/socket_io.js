const http = require("http");
const { Server } = require("socket.io");
const axios = require("axios");
require("dotenv").config();
const app = require("../app");

let server = http.createServer(app);
let io = new Server(server);

//localhost and server domain_name
let domain_name_on_cloud = "https://bob-chatbot.onrender.com";
let domain_name_on_local = "http://localhost:3001";

let current_domain_name = domain_name_on_cloud;

//sending response to client using socket.io
io.on("connection", (socket) => {
  socket.on("chat message", async (prompt) => {
    io.emit("chat message", { client: prompt });

    //using endpoint to interact with chatGPT openai.
    let response = await axios.get(
      `${current_domain_name}/openai/response/${prompt}`
    );
    let promptResponse = response.data;
    io.emit("chat message", { chatGpt: promptResponse });

    //creating payload with post method to mongodb
    let payload = {
      prompt: prompt,
      response: promptResponse,
    };

    let makeHistoryResponse;

    //saving prompt and response to mongodb
    if (payload.prompt && payload.response) {
      //api to send payload to mongoDB
      makeHistoryResponse = await axios.post(
        `${current_domain_name}/history/makeHistory`,
        payload
      );
    }

    //getting prompt and response from the mongodb
    if (makeHistoryResponse.data === "success") {
      let response = await axios.get(
        `${current_domain_name}/history/getHistory`
      );
      let data = response.data;
      io.emit("historyData", data);
    }
  });

  socket.on("historyData", async (msg) => {
    if (msg === "onload") {
      let response = await axios.get(
        `${current_domain_name}/history/getHistory`
      );
      let data = response.data;
      io.emit("historyData", data);
    }
  });
});

module.exports = server;