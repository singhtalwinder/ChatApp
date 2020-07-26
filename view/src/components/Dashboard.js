import React, { Fragment } from "react";

const Dashboard = (props) => {
	const signout = () => {
		if (props.auth2) {
			props.auth2.signOut();
		}
		localStorage.clear("auth-token");
		props.history.push("/");
	};

	return (
		<Fragment>
			<h1>Welcome</h1>
			<button onClick={signout}>SignOut</button>
		</Fragment>
	);
};

export default Dashboard;
