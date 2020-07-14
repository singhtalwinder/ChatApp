import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import IconInput from "./IconInput";
import PasswordToggler from "./PasswordToggler";

function SignIn(props) {
	let auth2;
	const initSigninV2 = () => {
		auth2 = window.gapi.auth2.init({
			client_id:
				"644858335314-uvtijjf3l1ttugk12punhmb2aickhc0b.apps.googleusercontent.com",
			scope: "profile",
		});
		attachSignin(document.getElementById("google-btn"));
	};

	const attachSignin = (element) => {
		auth2.attachClickHandler(
			element,
			{},
			async (googleUser) => {
				try {
					const response = await axios.post("/api/signin-with-google", {
						token: googleUser.getAuthResponse().id_token,
					});

					redirectToDashboard(response.data.authToken);
				} catch (err) {
					if (err.response) {
						alert(err.response.data);
					} else {
						alert("Network error");
					}
				}
			},
			(error) => {
				alert(JSON.stringify(error, undefined, 2));
			}
		);
	};

	useEffect(() => {
		window.gapi.load("auth2", initSigninV2);
	}, []);

	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (event) => {
		setData({ ...data, [event.target.name]: event.target.value });
	};

	const handleSignin = async (event) => {
		event.preventDefault();
		console.log(data);
		try {
			const response = await axios.post("/api/signin", data);
			redirectToDashboard(response.data.authToken);
		} catch (err) {
			if (err.response) {
				alert(err.response.data);
			} else {
				alert("Network error");
			}
		}
	};

	const redirectToDashboard = (authToken) => {
		localStorage.setItem("auth-token", authToken);
		props.history.push("/dashboard");
	};

	return (
		<form className="signin-form card">
			<h1>SignIn</h1>
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
			<button className="login-btn" onClick={handleSignin}>
				SignIn
			</button>
			<Link className="link" to="/signup">
				Don't have an account?SignUp
			</Link>
			<div className="seperator">
				<b>or</b>
			</div>
			<p>Sign in with your social media account</p>
			<div className="social-icon">
				<button type="button" id="google-btn">
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
