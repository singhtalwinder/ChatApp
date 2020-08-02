import express from "express";
import socketio from "socket.io";
import http from "http";
import "./config/dotenv";
import con from "./config/db";
import routes from "./routes";
import chat from "./controller/chat";

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use((req, res, next) => {
	req.con = con;
	next();
});

app.use("/api/", routes);

io.on("connection", chat);

server.listen(process.env.PORT, () => {
	console.log(`Running http://localhost:${process.env.PORT}`);
});
