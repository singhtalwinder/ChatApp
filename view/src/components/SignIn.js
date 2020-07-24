import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import IconInput from "./IconInput";
import PasswordToggler from "./PasswordToggler";
import "./SignIn.css";

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

	const [emailError, setEmailError] = useState({
		error: false,
		msg: "",
	});

	const [passwordError, setPasswordError] = useState({
		error: false,
		msg: "",
	});

	const handleChange = (event) => {
		setData({ ...data, [event.target.name]: event.target.value });
	};

	const handleSignin = async (event) => {
		event.preventDefault();

		setEmailError({
			error: false,
			msg: "",
		});
		setPasswordError({
			error: false,
			msg: "",
		});

		try {
			const response = await axios.post("/api/signin", data);
			redirectToDashboard(response.data.authToken);
		} catch (err) {
			if (err.response) {
				if (err.response.status === 406) {
					if (err.response.data.field === "email") {
						setEmailError({
							error: true,
							msg: err.response.data.msg,
						});
					} else if (err.response.data.field === "password") {
						setPasswordError({
							error: true,
							msg: err.response.data.msg,
						});
					} else {
						alert(err.response.data.msg);
					}
				}
			} else {
				alert("Network error");
			}
		}
	};

	const redirectToDashboard = (authToken) => {
		localStorage.setItem("auth-token", authToken);
		props.history.push({
			pathname: "/dashboard",
		});
	};

	return (
		<form className="signin-form card">
			<h1>SignIn</h1>
			<IconInput
				type="email"
				name="email"
				placeholder="E-mail Address"
				icon="fa fa-envelope"
				error={emailError.error}
				errorMessage={emailError.msg}
				onChange={handleChange}
			/>
			<IconInput
				type="password"
				name="password"
				placeholder="Password"
				icon="fa fa-lock"
				onChange={handleChange}
				error={passwordError.error}
				errorMessage={passwordError.msg}
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

			<button type="button" id="google-btn">
				<img src="https://img.icons8.com/color/42/000000/google-logo.png" />
				<p>continue with google</p>
			</button>
		</form>
	);
}

export default SignIn;
