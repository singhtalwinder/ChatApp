const users = new Map();

export default (socket) => {
	socket.on("send-joined", (data) => {
		data["socketId"] = socket.id;
		users[socket.id] = data;
		socket.broadcast.emit("receive-joined", data);
	});

	socket.on("send-message", (data) => {
		socket.to(data.socketId).emit("receive-message", {
			from: socket.id,
			msg: data.msg,
		});
	});

	socket.on("disconnect", () => {
		socket.broadcast.emit("left", users[socket.id]);
		users.delete(socket.id);
	});
};
