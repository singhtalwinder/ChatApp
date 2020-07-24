import React, { useState, useEffect } from "react";
import "./IconInput.css";

function IconInput(props) {
	const [borderColor, setBorderColor] = useState("#0084ff");

	useEffect(() => {
		if (props.error) {
			setBorderColor("red");
		} else {
			setBorderColor("#0084ff");
		}
	}, [props.error]);

	const handleFocus = () => {
		setBorderColor("black");
	};

	const handleBlur = () => {
		if (!props.error) {
			setBorderColor("#0084ff");
		} else {
			setBorderColor("red");
		}
	};

	return (
		<div className="icon-input-wrapper">
			<div className="icon-input" style={{ borderColor: borderColor }}>
				<span>
					<i className={props.icon}></i>
				</span>
				<input
					type={props.type}
					name={props.name}
					placeholder={props.placeholder}
					onChange={props.onChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
				{props.endIcon && <props.endIcon />}
			</div>
			{props.error && <p className="error-box">{"*" + props.errorMessage}</p>}
		</div>
	);
}

export default IconInput;
