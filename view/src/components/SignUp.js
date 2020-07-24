import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import IconInput from "./IconInput";
import PasswordToggler from "./PasswordToggler";
import "./SignUp.css";

const SignUp = (props) => {
	const [data, setData] = useState({
		fname: "",
		lname: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [fnameError, setFnameError] = useState({
		error: false,
		msg: "",
	});

	const [lnameError, setLnameError] = useState({
		error: false,
		msg: "",
	});

	const [emailError, setEmailError] = useState({
		error: false,
		msg: "",
	});

	const [passwordError, setPasswordError] = useState({
		error: false,
		msg: "",
	});

	const [confirmPasswordError, setConfirmPasswordError] = useState({
		error: false,
		msg: "",
	});

	const handleChange = (event) => {
		setData({ ...data, [event.target.name]: event.target.value });
	};

	const handleSignup = async (event) => {
		event.preventDefault();

		setFnameError({
			error: false,
			msg: "",
		});

		setLnameError({
			error: false,
			msg: "",
		});

		setEmailError({
			error: false,
			msg: "",
		});

		setPasswordError({
			error: false,
			msg: "",
		});

		setConfirmPasswordError({
			error: false,
			msg: "",
		});
		try {
			await axios.post("/api/signup", data);
			alert("signup successful");
			props.history.push("/");
		} catch (err) {
			if (err.response) {
				if (err.response.status === 406 || err.response.status === 400) {
					if (err.response.data.field === "fname") {
						setFnameError({
							error: true,
							msg: err.response.data.msg,
						});
					} else if (err.response.data.field === "lname") {
						setLnameError({
							error: true,
							msg: err.response.data.msg,
						});
					} else if (err.response.data.field === "email") {
						setEmailError({
							error: true,
							msg: err.response.data.msg,
						});
					} else if (err.response.data.field === "password") {
						setPasswordError({
							error: true,
							msg: err.response.data.msg,
						});
					} else if (err.response.data.field === "confirmPassword") {
						setPasswordError({
							error: true,
							msg: err.response.data.msg,
						});

						setConfirmPasswordError({
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

	return (
		<form className="signup-form card">
			<h1>SignUp</h1>

			<IconInput
				type="text"
				name="fname"
				placeholder="First name"
				icon="fa fa-user"
				error={fnameError.error}
				errorMessage={fnameError.msg}
				onChange={handleChange}
			/>

			<IconInput
				type="text"
				name="lname"
				placeholder="Last name"
				icon="fa fa-user"
				error={lnameError.error}
				errorMessage={lnameError.msg}
				onChange={handleChange}
			/>

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
				error={passwordError.error}
				errorMessage={passwordError.msg}
				endIcon={PasswordToggler}
				onChange={handleChange}
			/>

			<IconInput
				type="password"
				name="confirmPassword"
				placeholder="Confirm Password"
				icon="fa fa-lock"
				error={confirmPasswordError.error}
				errorMessage={confirmPasswordError.msg}
				endIcon={PasswordToggler}
				onChange={handleChange}
			/>
			<button className="signup-btn" onClick={handleSignup}>
				SignUp
			</button>
			<Link className="link" to="/">
				Already have an account?SignIn
			</Link>
		</form>
	);
};

export default SignUp;
