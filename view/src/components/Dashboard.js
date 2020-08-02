import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import Chatbox from "./Chatbox";
import "./Dashboard.css";

const ENDPOINT = "http://localhost:4000";
const socket = io(ENDPOINT);

const Dashboard = (props) => {
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [activeUser, setActiveUser] = useState(onlineUsers[0]);

	useEffect(() => {
		const getOnlineUsers = async () => {
			try {
				console.log(localStorage.getItem("auth-token"));
				const response = await axios.get("/api/online-users", {
					headers: {
						authToken: localStorage.getItem("auth-token"),
					},
				});
				setOnlineUsers(response.data.onlineUsers);
			} catch (err) {
				if (err.response) {
					alert(err.response.data);
				} else {
					alert("Network error");
				}
			}
		};

		getOnlineUsers();

		// if (onlineUsers.length) {
		// 	document
		// 		.getElementsByClassName("online-user")[0]
		// 		.classList.add("active-user");
		// }
	}, []);

	const toggleUser = (event, onlineUser) => {
		const active = document.getElementsByClassName("active-user")[0];

		if (active) {
			active.classList.remove("active-user");
		}

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
				{!onlineUsers.length && <h3>No one is online</h3>}
				<div>
					{onlineUsers.length &&
						onlineUsers.map((onlineUser) => (
							<User onlineUser={onlineUser} toggleUser={toggleUser} />
						))}
				</div>
			</div>
			<Chatbox {...props} activeUser={activeUser} />
		</div>
	);
};

const User = ({ onlineUser, toggleUser }) => {
	return (
		<div
			className="online-user"
			onClick={(event) => {
				toggleUser(event, onlineUser);
			}}
		>
			<span className="initials">
				{onlineUser.fname[0].toUpperCase() + onlineUser.lname[0].toUpperCase()}
			</span>
			<p className="full-name">{onlineUser.fname + " " + onlineUser.lname}</p>
		</div>
	);
};

export default Dashboard;
