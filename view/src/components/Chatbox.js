import React, { useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import "./Chatbox.css";

const ENDPOINT = "http://localhost:4000";
const socket = io(ENDPOINT);

const Chatbox = (props) => {
	const signout = async () => {
		if (props.auth2) {
			props.auth2.signOut();
		}
		try {
			await axios.patch(
				"/api/signout",
				{},
				{
					headers: {
						authToken: localStorage.getItem("auth-token"),
					},
				}
			);
			localStorage.clear("auth-token");
			props.history.push("/");
		} catch (err) {
			console.log(err);
			if (err.response) {
				alert(err.response.data);
			} else {
				alert("Network error");
			}
		}
	};

	const addMesssage = (message, className) => {
		const messages = document.getElementById("messages");
		const p = document.createElement("P");
		p.classList.add(className);
		p.textContent = message;
		const main = document.getElementsByClassName("main")[0];
		main.scrollTop = main.scrollHeight;
		messages.appendChild(p);
	};

	socket.on("receive-message", (data) => {
		console.log(data);
		console.log(localStorage.getItem("userId"));
		if (
			props.activeUser &&
			parseInt(data.from) === parseInt(props.activeUser.userId) &&
			parseInt(data.for) === parseInt(localStorage.getItem("userId")) &&
			data.flag
		) {
			data.flag = false;
			addMesssage(data.msg, "received-message");
		}
	});

	useEffect(() => {
		const messageInput = document.getElementById("message-input");
		messageInput.select();
		messageInput.addEventListener("keyup", (event) => {
			if (event.keyCode === 13) {
				if (messageInput.value === "" || !props.activeUser) {
					return;
				}
				socket.emit("send-message", {
					from: localStorage.getItem("userId"),
					for: props.activeUser.userId,
					msg: messageInput.value,
				});

				addMesssage(messageInput.value, "sent-message");
				messageInput.value = "";
			}
		});
	}, [props.activeUser]);

	return (
		<div className="chat-box">
			<div className="header">
				<div>
					<span className="initials">
						{props.activeUser &&
							props.activeUser.fname[0].toUpperCase() +
								props.activeUser.lname[0].toUpperCase()}
					</span>
					<p className="full-name">
						{props.activeUser &&
							props.activeUser.fname + " " + props.activeUser.lname}
					</p>
				</div>
				<i className="fa fa-power-off" onClick={signout} />
			</div>
			<div className="main">
				<div id="messages"></div>
			</div>
			<div className="footer">
				<input
					id="message-input"
					type="text"
					name="message"
					placeholder="Type a message..."
				/>
			</div>
		</div>
	);
};

export default Chatbox;
