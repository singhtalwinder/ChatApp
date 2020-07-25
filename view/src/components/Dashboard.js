import React, { useEffect } from "react";
import { onlineUsers } from "./fakeData";
import "./Dashboard.css";

const Dashboard = (props) => {
	const signout = () => {
		if (props.location.auth2) {
			props.location.auth2.signOut();
		}
		localStorage.clear("auth-token");
		props.history.push("/");
	};

	useEffect(() => {
		return signout;
	}, []);

	return (
		<div className="dashboard-container">
			<div className="online-users">
				<h4>Online users</h4>
				<div>
					{onlineUsers.map((onlineUser) => (
						<div className="online-user">
							<span className="initials">
								{onlineUser.fname[0].toUpperCase() +
									onlineUser.lname[0].toUpperCase()}
							</span>
							<span className="full-name">
								{onlineUser.fname + " " + onlineUser.lname}
							</span>
						</div>
					))}
				</div>
			</div>
			<div className="chat-box">chat-box</div>
		</div>
	);
};

export default Dashboard;
