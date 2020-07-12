import React from "react";

const PasswordToggler = () => {
	const handleToggle = (event) => {
		const input = event.target.parentNode.previousSibling;
		if (input.getAttribute("type") === "password") {
			input.setAttribute("type", "text");
			event.target.className = "fa fa-eye-slash";
		} else {
			input.setAttribute("type", "password");
			event.target.className = "fa fa-eye";
		}
	};
	return (
		<span>
			<i className="fa fa-eye" onClick={handleToggle} />
		</span>
	);
};

export default PasswordToggler;
