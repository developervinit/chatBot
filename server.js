const app = require("./app");
const http = require("http");
const path = require("node:path");
const { Server } = require("socket.io");
const mongoose = require('mongoose');
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
    socket.on('chat message', async (msg) => {
        io.emit('chat message', msg);
    });
});


server.listen(process.env.PORT, () => console.log(`Server is listening on the port ${process.env.PORT}`));
