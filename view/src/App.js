import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import SignIn from "../src/components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";

function App() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [auth2, setAuth2] = useState(null);

	useEffect(() => {
		const initSigninV2 = async () => {
			try {
				const auth2 = await window.gapi.auth2.init({
					client_id:
						"644858335314-uvtijjf3l1ttugk12punhmb2aickhc0b.apps.googleusercontent.com",
					scope: "profile",
				});
				setAuth2(auth2);
				setLoading(false);
			} catch (err) {
				console.log(err);
				setError(true);
			}
		};
		window.gapi.load("auth2", initSigninV2);
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error...</p>;
	return (
		<React.Fragment>
			<Router>
				<Switch>
					<Route
						exact
						path="/"
						render={(props) => <SignIn {...props} auth2={auth2} />}
					/>
					<Route exact path="/signup" component={SignUp} />
					<ProtectedRoute
						exact
						path="/dashboard"
						component={Dashboard}
						auth2={auth2}
					/>
				</Switch>
			</Router>
		</React.Fragment>
	);
}

function ProtectedRoute({ component: Component, ...rest }) {
	if (!localStorage.getItem("auth-token")) {
		return <Redirect to="/" />;
	}

	return (
		<Route
			{...rest}
			render={(props) => {
				return <Component {...props} />;
			}}
		/>
	);
}

export default App;
