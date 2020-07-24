import React from "react";
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
	return (
		<React.Fragment>
			<Router>
				<Switch>
					<Route exact path="/" component={SignIn} />
					<Route exact path="/signup" component={SignUp} />
					<ProtectedRoute exact path="/dashboard" component={Dashboard} />
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
