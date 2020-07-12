import React, { useState } from "react";
import { Link } from "react-router-dom";
import IconInput from "./IconInput";
import PasswordToggler from "./PasswordToggler";

function SignIn() {
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (event) => {
		setData({ ...data, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		// try {
		// 	await axios.post("/api/user/sign-in", data);
		// 	props.history.push("/dashboard");
		// } catch (err) {
		// 	if (err.response) {
		// 		alert(err.response.data);
		// 	} else {
		// 		alert("Network error");
		// 	}
		// }
	};

	return (
		<form className="signin-form card">
			<h1>Login</h1>
			<IconInput
				type="email"
				name="email"
				placeholder="E-mail Address"
				icon="fa fa-envelope"
				onChange={handleChange}
			/>
			<IconInput
				type="password"
				name="password"
				placeholder="Password"
				icon="fa fa-lock"
				onChange={handleChange}
				endIcon={PasswordToggler}
			/>
			<button className="login-btn">Login</button>
			<Link className="link" to="/signup">
				Don't have an account?SignUp
			</Link>
			<div className="seperator">
				<b>or</b>
			</div>
			<p>Sign in with your social media account</p>
			<div className="social-icon">
				<button type="button">
					<i className="fa fa-google"></i>
				</button>
				<button type="button">
					<i className="fa fa-facebook"></i>
				</button>
			</div>
		</form>
	);
}

export default SignIn;
