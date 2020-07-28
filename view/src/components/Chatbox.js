import React, { useEffect } from "react";
import "./Chatbox.css";

const Chatbox = (props) => {
	let flag = true;
	const signout = () => {
		if (props.auth2) {
			props.auth2.signOut();
		}
		localStorage.clear("auth-token");
		props.history.push("/");
	};

	useEffect(() => {
		const messageInput = document.getElementById("message-input");
		messageInput.select();
		messageInput.addEventListener("keyup", (event) => {
			if (event.keyCode === 13) {
				if (messageInput.value === "") {
					return;
				}
				const messages = document.getElementById("messages");
				const p = document.createElement("P");
				if (flag) {
					p.classList.add("received-message");
				} else {
					p.classList.add("sent-message");
				}
				flag = !flag;
				p.textContent = messageInput.value;
				const main = document.getElementsByClassName("main")[0];
				main.scrollTop = main.scrollHeight;
				messages.appendChild(p);
				messageInput.value = "";
			}
		});
	}, []);
	return (
		<div className="chat-box">
			<div className="header">
				<div>
					<span className="initials">
						{props.activeUser.fname[0].toUpperCase() +
							props.activeUser.lname[0].toUpperCase()}
					</span>
					<p className="full-name">
						{props.activeUser.fname + " " + props.activeUser.lname}
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
