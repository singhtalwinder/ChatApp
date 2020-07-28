import React, { useState, useEffect } from "react";
import Chatbox from "./Chatbox";
import { onlineUsers } from "./fakeData";
import "./Dashboard.css";

const Dashboard = (props) => {
	const [activeUser, setActiveUser] = useState(onlineUsers[0]);

	useEffect(() => {
		document
			.getElementsByClassName("online-user")[0]
			.classList.add("active-user");
	}, []);

	const toggleUser = (event, onlineUser) => {
		document
			.getElementsByClassName("active-user")[0]
			.classList.remove("active-user");
		if (event.target.nodeName !== "DIV") {
			event.target.parentNode.classList.add("active-user");
		} else {
			event.target.classList.add("active-user");
		}
		setActiveUser(onlineUser);
		const chatBoxMain = document.querySelector(".chat-box .main");
		chatBoxMain.removeChild(chatBoxMain.firstChild);
		const chatBoxMessages = document.createElement("DIV");
		chatBoxMessages.id = "messages";
		chatBoxMain.appendChild(chatBoxMessages);
	};

	return (
		<div className="dashboard-container">
			<div className="online-users">
				<h4>Online users</h4>
				<div>
					{onlineUsers.map((onlineUser, index) => (
						<div
							className="online-user"
							key={index}
							onClick={(event) => {
								toggleUser(event, onlineUser);
							}}
						>
							<span className="initials">
								{onlineUser.fname[0].toUpperCase() +
									onlineUser.lname[0].toUpperCase()}
							</span>
							<p className="full-name">
								{onlineUser.fname + " " + onlineUser.lname}
							</p>
						</div>
					))}
				</div>
			</div>
			<Chatbox {...props} activeUser={activeUser} />
		</div>
	);
};

export default Dashboard;
