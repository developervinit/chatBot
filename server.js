const app = require("./app");
const http = require("http");
const path = require("node:path");
const { Server } = require("socket.io");
require("dotenv").config();

let server = http.createServer(app);
let io = new Server(server);

// app.use(express.static(path.dirname("./public/index.html")));
let join = path.join;


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
