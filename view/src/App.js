import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "../src/components/SignIn";

function App() {
	return (
		<React.Fragment>
			<Router>
				<Switch>
					<Route exact path="/" component={SignIn} />
				</Switch>
			</Router>
		</React.Fragment>
	);
}

export default App;
