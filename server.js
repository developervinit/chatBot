const app = require("./app");
const http = require("http");
const path = require("node:path");
require("dotenv").config();

let server = http.createServer(app);

// app.use(express.static(path.dirname("./public/index.html")));
let join = path.join;


//attaching static file on home-route
app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "public/index.html"));
});


server.listen(process.env.PORT, () => console.log(`Server is listening on the port ${process.env.PORT}`));
