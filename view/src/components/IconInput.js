import React from "react";
import "./IconInput.css";

function IconInput(props) {
	const handleFocus = (event) => {
		const iconInput = event.target.parentNode;
		iconInput.style.borderColor = "black";
	};

	const handleBlur = (event) => {
		const iconInput = event.target.parentNode;
		iconInput.style.borderColor = "#0084FF";
	};

	return (
		<div className="icon-input">
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
	);
}

export default IconInput;
