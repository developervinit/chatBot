const app = require("./app");
const http = require("http");
const path = require("node:path");
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const axios = require("axios");
require("dotenv").config();

let server = http.createServer(app);
let io = new Server(server);

// app.use(express.static(path.dirname("./public/index.html")));
let join = path.join;

//start-code to connect mongodb
async function connectingMongoose(dbString){
    try{
        await mongoose.connect(dbString);
    }catch(error){
        console.error('Error connecting to MongoDB:', error);
    }
    
}

const db = mongoose.connection;
db.on("connected", () => {
    console.log("Connected to MongoDB Successfully");
});
db.on("error", (err) => {
    console.error(`Error connecting to mongoDB ${err}`);
})

let dbString = process.env.CONNECTIONSTRING.replace("password", process.env.PASSWORD);
connectingMongoose(dbString);
//end-code to connect mongodb


//attaching static file on home-route
app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "public/index.html"));
});

//sending response to client using socket.io
io.on('connection', (socket) => {
    socket.on('chat message', async (prompt) => {
        io.emit('chat message', {client: prompt});

        //using endpoint to interact with chatGPT openai.
        let response = await axios.get(`http://localhost:3001/openai/response/${prompt}`);
        let promptResponse = response.data
        io.emit('chat message', {chatGpt: promptResponse});

        //creating payload with post method to mongodb
        let payload = {
            prompt: prompt,
            response: promptResponse
        }

        let makeHistoryResponse;

        //saving prompt and response to mongodb
        if(payload.prompt && payload.response){
            //api to send payload to mongoDB
            makeHistoryResponse = await axios.post(`http://localhost:3001/history/makeHistory`, payload);
        }

        //getting prompt and response from the mongodb
        if(makeHistoryResponse.data === "success"){
            let response = await axios.get(`http://localhost:3001/history/getHistory`);
            let data = response.data;
            io.emit("historyData", data);
        }
    });

    socket.on("historyData", async (msg) => {
        if(msg === "onload"){
            let response = await axios.get(`http://localhost:3001/history/getHistory`);
            let data = response.data;
            io.emit("historyData", data);
        }
    })
});


server.listen(process.env.PORT, () => console.log(`Server is listening on the port ${process.env.PORT}`));
