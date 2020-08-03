const users = new Map();

export default (socket, io) => {
	socket.on("send-joined", (data) => {
		users.set(data.userId, socket.id);
		socket.broadcast.emit("receive-joined", {
			userId: data.userId,
			fname: data.fname,
			lname: data.lname,
		});
	});

	socket.on("send-message", (data) => {
		socket.broadcast.emit("receive-message", {
			for: data.for,
			from: data.from,
			msg: data.msg,
			flag: true,
		});
	});
};
