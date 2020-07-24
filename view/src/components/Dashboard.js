import React, { Fragment, useEffect } from "react";

const Dashboard = (props) => {
	const signout = () => {
		localStorage.clear("auth-token");
		props.history.push("/");
	};

	useEffect(() => {
		return signout;
	}, []);

	return (
		<Fragment>
			<h1>Welcome</h1>
			<button onClick={signout}>SignOut</button>
		</Fragment>
	);
};

export default Dashboard;
