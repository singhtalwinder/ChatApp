import React, { useEffect } from "react";
import "./Chatbox.css";

const Chatbox = (props) => {
	const signout = () => {
		if (props.auth2) {
			props.auth2.signOut();
		}
		localStorage.clear("auth-token");
		props.history.push("/");
	};

	useEffect(() => {
		document.getElementById("message-input").select();
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
			<div className="messages">er</div>
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
