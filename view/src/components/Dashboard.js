import React, { Fragment, useEffect } from "react";

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
		<Fragment>
			<h1>Welcome</h1>
			<button onClick={signout}>SignOut</button>
		</Fragment>
	);
};

export default Dashboard;
